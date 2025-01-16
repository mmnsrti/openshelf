interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
const BookList = ({ title, books, containerClassName }: Props) => {
  return (
    <section>
      <h1 className="font-bebas-neue text-4xl text-light-100">Book List</h1>
    </section>
  );
};

export default BookList;
