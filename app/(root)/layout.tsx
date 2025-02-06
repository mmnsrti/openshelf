import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzel";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    return redirect("/sign-in");
  }
  after(async () => {
    if (!session?.user?.id) return;
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);
    if (user[0].lastActive === new Date().toISOString().slice(0, 10)) return;
    await db
      .update(users)
      .set({ lastActive: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default layout;
