import React from "react";
import DeleteButton from "./components/DeleteButton";
import ToggleReadButton from "./components/ToggleReadButton";
import { MdMenuBook } from "react-icons/md";

export default function BookList({ books, fetchBooks }) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone,
      dateStyle: "short",
      timeStyle: "short",
    });
    return formatter.format(parsedDate);
  };

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <div
            key={book._id}
            className="min-h-fit bg-white bg-opacity-15 p-2 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-200">{book.author}</p>
            {book.coverImage ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`}
                alt={book.title}
                className="w-full h-svh min-h-40 max-h-44 sm:max-h-64 md:max-h-72 object-cover rounded mt-1"
              />
            ) : (
              <MdMenuBook className="w-full h-svh min-h-40 max-h-44 sm:max-h-64 md:max-h-72 object-cover rounded mt-1" />
            )}
            <div className="py-2">
              <p>Added: {formatDate(book.createdAt)}</p>
              <p>Last updated: {formatDate(book.updatedAt)}</p>
            </div>
            <div className="flex justify-between my-0 md:my-2">
              <ToggleReadButton
                bookId={book._id}
                read={book.read}
                fetchBooks={fetchBooks}
              />
              <DeleteButton bookId={book._id} fetchBooks={fetchBooks} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
