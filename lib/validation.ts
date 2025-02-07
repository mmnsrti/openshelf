import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const bookSchema = z.object({
  title: z.string().min(3).trim().max(100),
  description: z.string().min(3).trim().max(1000),
  author: z.string().min(3).trim().max(100),
  genre: z.string().min(3).trim().max(50),
  rating: z.number().min(3).max(100),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().min(3).trim(),
});
