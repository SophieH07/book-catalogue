import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Filter({
  activeTab,
  fetchBooks,
  showAddForm,
  toggleShowAddForm,
}) {
  return (
    <div id="filter">
      <button
        onClick={() => fetchBooks("all")}
        className={` ${
          (activeTab === "all" || activeTab === null) && "active-tab"
        }`}
      >
        All books
      </button>
      <button
        onClick={() => fetchBooks(true)}
        className={` ${activeTab === true && "active-tab"}`}
      >
        Read books
      </button>
      <button
        onClick={() => fetchBooks(false)}
        className={` ${activeTab === false && "active-tab"}`}
      >
        Unread books
      </button>
      <button
        className="inline-flex justify-center items-center gap-4"
        onClick={() => toggleShowAddForm()}
      >
        Add new book {showAddForm ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
}
