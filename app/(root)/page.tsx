import { auth } from "@/auth";

import LogOutForm from "@/components/forms/LogOutForm";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";

const Home = async () => {
  const session = await auth();

  return (
    <div className="min-h-[calc(100vh-84px)]">
      <h1 className="text-3xl font-bold flex-center">
        Welcome to the home page
      </h1>
      <div className="flex-center gap-4 mt-4">
        {!session ? (
          <>
            <Button className="cursor-pointer" asChild>
              <Link href={ROUTES.signIn}>
                <AiOutlineUserAdd />
                Sign In
              </Link>
            </Button>
            <Button className="cursor-pointer" asChild>
              <Link href={ROUTES.signUp}>
                <AiOutlineUser />
                Sign Up
              </Link>
            </Button>
          </>
        ) : (
          <LogOutForm />
        )}
      </div>
    </div>
  );
};

export default Home;
