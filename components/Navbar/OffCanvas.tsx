"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import Link from "next/link";
import { useState } from "react";
import { TbMenuDeep } from "react-icons/tb";

const OffCanvas = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dark:text-white sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <TbMenuDeep />
        </SheetTrigger>
        <SheetContent className="rounded-l-1.5">
          <SheetHeader className="hidden">
            <SheetTitle className="hidden">Mobile Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex-center flex-col gap-4 px-8 w-full min-h-[100vh]">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="uppercase font-semibold text-sm"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OffCanvas;
