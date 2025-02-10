import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut } from "@/auth";
const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={10} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/Library"
            className={cn("text-base cursor-pointer capitalize")}
          >
            Library
          </Link>
        </li>
        <li>
          {/* <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="text-white bg-slate-600 ">
                {getInitialized(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </Link> */}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mb-10"
          >
            <Button>Log Out</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
