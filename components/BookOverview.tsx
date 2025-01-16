import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  video,
  summary,
}: Book) => {
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
            {available_copies} available copies / {total_copies} total copies
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Button className="book-overview-btn">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />{" "}
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center ">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
        </div>
        <div className="absolute top-10 left-16 z-50 max-sm:hidden opacity-40 rotate-12">
          {" "}
          <BookCover variant="wide" coverColor={color} coverImage={cover} />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
