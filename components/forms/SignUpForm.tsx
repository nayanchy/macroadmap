"use client";

import SocialLogin from "./SocialLogin";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = signUpSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        toast.success("Sign up successful! Redirecting to sign in...", {
          duration: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          router.push(ROUTES.signIn);
        }, 2000);
      } else {
        const data = await response.json();
        setErrors({
          general: data.meessage || "An error occurred during sign up",
        });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again later." });
      console.error("Sign up error:", err);
    }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col rounded-xl bg-transparent">
        <h4 className="block text-xl font-medium text-dark100_light900">
          Sign Up
        </h4>
        <p className="text-slate-500 font-light mt-2">
          Nice to meet you! Enter your details to register.
        </p>
        <form
          className="mt-8 mb-2 w-full max-w-screen-sm sm:w-96"
          onSubmit={handleSignUp}
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label
                className="block mb-2 text-sm text-slate-600"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="!text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
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
              {errors.email && (
                <p className="!text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="!text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          {errors.general && toast(errors.general)}
          <button
            className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <SocialLogin type="signup" />
      <p className="flex justify-center mt-6 text-sm text-slate-600">
        Already have an account?
        <Link
          href={ROUTES.signIn}
          className="ml-1 text-sm font-semibold text-slate-700 underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
