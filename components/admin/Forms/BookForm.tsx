"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      videoUrl: "",
      summary: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof bookSchema>) => {};
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Book Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter book title"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter author name"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    genre
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter genre"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Rating
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      min={1}
                      max={5}
                      placeholder="Enter rating"
                      {...field}
                      className="book-form_input"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalCopies"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Total Copies
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      min={1}
                      max={10000}
                      placeholder="Enter total copies"
                      {...field}
                      className="book-form_input"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Cover Image URL
                  </FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverColor"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Cover Color
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter cover color"
                      {...field}
                      className="book-form_input"
                      type="color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Enter book description"
                      {...field}
                      className="book-form_input"
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Book Trailer
                  </FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Summary
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Enter book summary"
                      {...field}
                      className="book-form_input"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit" className="book-form_btn text-white">
                Add book to library
              </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookForm;
