import React from "react";

import { IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import { handleSocialLogin } from "@/lib/handlers/action";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const SocialLogin = ({ type }: { type: "signup" | "signin" }) => {
  const callbackUrl = useSearchParams().get("callbackUrl") || "";
  return (
    <form className="flex gap-2 mt-4 flex-between" action={handleSocialLogin}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Button
          type="submit"
          value="google"
          name="action"
          className="cursor-pointer"
        >
          <IoLogoGoogle />
          {type === "signup" ? "Sign Up With Google" : "Sign In With Google"}
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          value="github"
          name="action"
          className="cursor-pointer"
        >
          <IoLogoGithub />
          {type === "signup" ? "Sign Up With GitHub" : "Sign In With GitHub"}
        </Button>
      </div>
    </form>
  );
};

export default SocialLogin;
