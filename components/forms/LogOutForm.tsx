"use client";
import React from "react";
import { IoLogOut } from "react-icons/io5";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { handleLogout } from "@/lib/handlers/action";

const LogOutForm = () => {
  const { pending } = useFormStatus();
  return (
    <form action={handleLogout}>
      <Button type="submit" className="cursor-pointer" disabled={pending}>
        <IoLogOut />
        {pending ? "Logging out..." : "Logout"}
      </Button>
    </form>
  );
};

export default LogOutForm;
