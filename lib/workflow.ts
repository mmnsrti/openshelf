import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import { Client as QstashClient, resend } from "@upstash/qstash";
const qstashClient = new QstashClient({
  token: config.env.upstash.qstashToken,
});

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend }),
    },
    body: {
      from: "Open Shelf <openshelf.com>",
      to: [email],
      subject: subject,
      html: body,
    },
  });
};
