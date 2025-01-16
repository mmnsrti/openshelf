"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const Header = () => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">OpenShelf</Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/Library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/Library" ? "text-light-400" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  ); 
};

export default Header;
