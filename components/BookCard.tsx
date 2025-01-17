import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({ id, title, genre, color, cover, isLoanedBook }:Book) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/book/${id}`}
      className={cn(
        isLoanedBook && "xs:w-52 w-full flex flex-col items-center"
      )}
    >
      <BookCover coverColor={color} coverImage={cover} />
      <div className={cn(isLoanedBook && "xs:max-w-40 max-w-28", "mt-4")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>
      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-light-100">Loaned</p>
          </div>
          <Button className="book-btn bg-dark-600">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
