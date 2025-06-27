import { ROUTES, SITEGLOBAL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import ProfileIcon from "./ProfileIcon";
import ThemeChanger from "../Theme";
import { IoLogIn } from "react-icons/io5";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import OffCanvas from "./OffCanvas";

const GlobalNav = async () => {
  const session = await auth();

  return (
    <header className="flex w-full py-4 px-4 sm:px-30 flex-between bg-slate-100 dark:bg-slate-800 sticky top-0 z-50">
      <div className="">
        <Link href="/" className="">
          <Image
            src={SITEGLOBAL.logo}
            alt="logo"
            width={80}
            height={80}
            className="focus:outline-none"
          />
        </Link>
      </div>
      <div className="flex gap-10 items-center">
        <div className="">
          <NavItems />
        </div>
        <div className="flex justify-center items-center gap-4">
          {!session ? (
            <Button className="!bg-primary-500" asChild>
              <Link href={ROUTES.signIn} className="dark:text-white">
                <IoLogIn />
                Sign In
              </Link>
            </Button>
          ) : (
            <ProfileIcon />
          )}

          <ThemeChanger />
          <OffCanvas />
        </div>
      </div>
    </header>
  );
};

export default GlobalNav;
