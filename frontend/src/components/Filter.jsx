import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Filter({ fetchBooks, showAddForm, toggleShowAddForm }) {
  return (
    <div id="filter">
      <button onClick={() => fetchBooks("all")}>All books</button>
      <button onClick={() => fetchBooks(true)}>Read books</button>
      <button onClick={() => fetchBooks(false)}>Unread books</button>
      <button
        className="inline-flex justify-center items-center gap-4"
        onClick={() => toggleShowAddForm()}
      >
        Add new book {showAddForm ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
}
