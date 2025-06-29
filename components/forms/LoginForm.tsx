"use client";
import { handleCredLogin } from "@/lib/handlers/action";
import SocialLogin from "./SocialLogin";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";

const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const result = signInFormSchema.safeParse({
        email,
        password,
      });

      if (!result.success) {
        const fieldErrors: { [key: string]: string } = {};
        result.error.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        setLoading(false);
        return;
      }
      formData.append("callbackUrl", callbackUrl);
      const response = await handleCredLogin(formData);

      if (response.error) {
        console.log(response.error);
      } else {
        setLoading(false);
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
            {errors.email && (
              <p className="!text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="!text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loading ? (
            <Button disabled className="w-full mt-4" asChild>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-4 h-4 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin"></span>
                Signing In
              </div>
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Sign In
            </Button>
          )}
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
