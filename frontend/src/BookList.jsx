import React from "react";
import DeleteButton from "./components/DeleteButton";
import ToggleReadButton from "./components/ToggleReadButton";
import { MdMenuBook } from "react-icons/md";

export default function BookList({ books, fetchBooks }) {
  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books?.map((book) => (
          <div
            key={book._id}
            className="bg-white bg-opacity-15 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-200">{book.author}</p>
            {book.coverImage ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${book.coverImage}`}
                alt={book.title}
                className="w-full h-full max-h-44 md:max-h-64 min-h-14 object-cover rounded mt-2"
              />
            ) : (
              <MdMenuBook className="w-full h-full max-h-44 md:max-h-64 min-h-14 object-cover rounded mt-2" />
            )}
            <div className="flex justify-between pt-4">
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
