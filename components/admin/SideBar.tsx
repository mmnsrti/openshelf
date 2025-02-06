"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitialized } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const SideBar = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            alt="logo"
            src="/icons/admin/logo.svg"
            width={50}
            height={50}
          />
          <h1>Admin</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== pathName &&
                pathName.includes(link.route) &&
                link.route.length > 1) ||
              pathName === link.route;
            return (
              <Link
                href={link.route}
                key={link.route}
                className={cn(
                  "link",
                  isSelected && "bg-primary-admin shadow-sm"
                )}
              >
                <div className="relative size-5">
                  <Image
                    alt={link.text}
                    src={link.img}
                    fill
                    className={cn(isSelected ? "brightness-0 invert" : "")}
                  />
                </div>
                <p className={cn(isSelected ? "text-white" : "text-dark")}>
                  {link.text}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="user">
          <Avatar>
            <AvatarFallback className="text-white bg-slate-600 ">
              {getInitialized(session?.user?.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-md:hidden">
            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
