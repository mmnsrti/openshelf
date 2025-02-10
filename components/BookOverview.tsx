import Image from "next/image";
import React from "react";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzel";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  userId,
  id,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!user) return null;
  const borrowEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "book is not available"
        : "you are not eligible to borrow this book",
  };
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5 text-light-300">
        <h2>{title}</h2>
        <div className="book-info">
          <p>
            By
            <span className="font-semibold text-light-200"> {author}</span>
          </p>
          <p>
            Category
            <span className="font-semibold text-light-200"> {genre}</span>
          </p>
          <div className="flex flex-row">
            {" "}
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            {availableCopies} available copies / {totalCopies} total copies
          </p>
        </div>
        <p className="book-description">{description}</p>
        <BorrowBook userId={userId} bookId={id} borrowEligibility={borrowEligibility}/>
      </div>
      <div className="relative flex flex-1 justify-center ">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
        <div className="absolute right-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover
            variant="wide"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
