import { db } from "@/database/drizzel";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
type UserState = "non-active" | "active";
type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const THREE_DAY_IN_MS = 1000 * 60 * 60 * 24 * 3;
const ONE_MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "welcome to open shelf",
      body: `Welcome ${fullName}`,
    });
  });

  await context.sleep("wait-for-3-days", THREE_DAY_IN_MS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "are you still there?",
          body: `hey ${fullName} we miss you`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "welcome back",
          body: `hey ${fullName} welcome back`,
        });
      });
    }

    await context.sleep("wait-for-1-month", ONE_MONTH_IN_MS);
  }
});

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) {
    return "non-active";
  }
  const lastActive = new Date(user[0].lastActive);
  const now = new Date();
  const timeDeference = now.getTime() - lastActive.getTime();
  if (timeDeference > THREE_DAY_IN_MS && timeDeference <= ONE_MONTH_IN_MS) {
    return "non-active";
  }
  return "active";
};
