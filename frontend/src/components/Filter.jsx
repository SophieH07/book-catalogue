import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Filter({ fetchBooks, showAddForm, toggleShowAddForm }) {
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchBooks(filter);
  }, [filter]);

  return (
    <div id="filter">
      <button onClick={() => setFilter("all")}>All books</button>
      <button onClick={() => setFilter(true)}>Read books</button>
      <button onClick={() => setFilter(false)}>Unread books</button>
      <button
        className="inline-flex justify-center items-center gap-4"
        onClick={() => toggleShowAddForm()}
      >
        Add new book {showAddForm ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
}
