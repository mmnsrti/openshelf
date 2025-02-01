"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzel";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ratelimit from "../ratelimit";
export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    redirect("/too-fast");
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result.error) {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to sign in" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, universityCard, universityId, email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    redirect("/too-fast");
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      fullName,
      universityCard,
      universityId,
      email,
      password: hashedPassword,
    });
    await signInWithCredentials({ email, password });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create user" };
  }
};
