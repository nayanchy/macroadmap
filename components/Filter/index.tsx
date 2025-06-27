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
const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleFilter = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value as string);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-4">
      {searchParams.has("status") && (
        <Button
          className="!bg-primary-500 rounded-full cursor-pointer"
          onClick={clearFilter}
          asChild
        >
          <div className="flex gap-2 items-center">
            <IoClose className="text-xs" />
            <span className="text-xs">Clear Filter</span>
          </div>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <IoFilter />
            Filter
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort Items</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter("status", "Completed")}>
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFilter("status", "In Progress")}
          >
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter("status", "Planned")}>
            Planned
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filter;
