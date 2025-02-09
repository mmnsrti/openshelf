"use server";

import { db } from "@/database/drizzel";
import { books } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();
    return {
      success: true,
      message: "Book created successfully",
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: "Failed to create book",
    };
  }
};
