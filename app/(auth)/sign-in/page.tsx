import LoginForm from "@/components/forms/LoginForm";
import { Suspense } from "react";

const SignIn = () => {
  return (
    <div className="flex-center min-h-[100vh]">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default SignIn;
