import SignUpForm from "@/components/forms/SignUpForm";
import React, { Suspense } from "react";

const SignUp = () => {
  return (
    <Suspense>
      <div className="flex-center min-h-[100vh]">
        <SignUpForm />
      </div>
    </Suspense>
  );
};

export default SignUp;
