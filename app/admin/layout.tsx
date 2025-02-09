import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import "@/styles/admin.css";
import SideBar from "@/components/admin/SideBar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzel";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }
  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");
  if (!isAdmin) {
    return redirect("/");
  }
  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default layout;
