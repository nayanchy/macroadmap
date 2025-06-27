"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { IoClose, IoFilter } from "react-icons/io5";
import { Button } from "../ui/button";
import { useCallback } from "react";
const Sort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSort = useCallback(
    (key?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key as string, value as string);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  const clearSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-4">
      {searchParams.has("sortBy") && (
        <Button
          className="!bg-primary-500 rounded-full cursor-pointer"
          onClick={clearSort}
          asChild
        >
          <div className="flex gap-2 items-center">
            <IoClose size={4} />
            <span className="text-xs">Clear Sort</span>
          </div>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <IoFilter />
            Sort
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort Items</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSort("sortBy", "Popularity")}>
            Popularity
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
