"use client";
import { handleCredLogin } from "@/lib/handlers/action";
import SocialLogin from "./SocialLogin";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Button } from "../ui/button";

const LoginForm = () => {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("callbackUrl", callbackUrl);
      const response = await handleCredLogin(formData);

      if (response.error) {
        console.log(response.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col rounded-xl bg-transparent ">
        <h4 className="block text-xl font-medium text-dark100_light900">
          Sign In
        </h4>
        <p className="text-slate-500 font-light mt-2">
          Nice to see you! Enter your details to login.
        </p>
        <form
          className="mt-8 mb-2 w-full max-w-screen-sm sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Email"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Sign In
          </Button>
        </form>
      </div>
      <SocialLogin type="signin" />
      <p className="flex justify-center mt-6 text-sm text-slate-600">
        Don&apos;t have an account?
        <Link
          href={ROUTES.signUp}
          className="ml-1 text-sm font-semibold text-slate-700 underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
