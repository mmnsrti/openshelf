"use client";
import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyle: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverImage: string;
}
const BookCover = ({
  variant = "regular",
  className,
  coverColor = "#012B48",
  coverImage = "https://placehold.co/600x400/png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyle[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10 bg-gray-200"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          loading="lazy"
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;
