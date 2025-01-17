import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={() => console.log()}
    />
  );
};

export default page;
