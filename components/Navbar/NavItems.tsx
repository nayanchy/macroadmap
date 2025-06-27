"use client";

import { navItems } from "@/constants/data";
import Link from "next/link";

const NavItems = () => {
  return (
    <nav className="hidden gap-4 justify-center items-center sm:flex">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className="uppercase font-semibold text-sm"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
