import { useEffect, useState } from "react";

export default function Filter({ fetchBooks }) {
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchBooks(filter);
  }, [filter]);

  return (
    <div className="flex gap-3 mt-2 mb-4 sm:mx-10 md:mx-14 lg:mx-20">
      <button
        onClick={() => setFilter("all")}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        All books
      </button>
      <button
        onClick={() => setFilter(true)}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Read books
      </button>
      <button
        onClick={() => setFilter(false)}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Unread books
      </button>
    </div>
  );
}
