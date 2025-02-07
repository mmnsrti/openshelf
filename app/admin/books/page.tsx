import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-gray-900">All Books </h1>
        <Button className="bg-primary-admin " asChild>
          <Link href="/admin/books/new" className="text-white">
            Add New Book
          </Link>
        </Button>
      </div>
      {/* Book cards */}
      <div className="mt-7 w-full overflow-hidden">
        <p>table</p>
      </div>
    </section>
  );
};

export default page;
