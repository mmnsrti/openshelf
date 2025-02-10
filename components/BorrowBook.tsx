"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
interface Props {
  userId: string;
  bookId: string;
  borrowEligibility: {
    isEligible: boolean;
    message: string;
  };
}
const BorrowBook = ({
  userId,
  bookId,
  borrowEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const handleBorrow = async () => {
    if (!isEligible) {
      toast({
        title: "error",
        description: message,
        variant: "destructive",
      });
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ userId, bookId });
      if (result.success) {
        toast({
          title: "success",
          description: "Book borrowed successfully",
          variant: "default",
        });
        router.push(`my-profile`);
      } else {
        toast({
          title: "error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "error",
        description: "Failed to borrow book. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview-btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />{" "}
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? " Borrowing..." : "Borrow"}
      </p>
    </Button>
  );
};

export default BorrowBook;
