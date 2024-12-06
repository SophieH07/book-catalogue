import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Filter({ fetchBooks, showAddForm, toggleShowAddForm }) {
  const [activeTab, setActiveTab] = useState(null);

  const setActiveFilter = (filter) => {
    setActiveTab(filter);
    fetchBooks(filter);
  };

  return (
    <div id="filter">
      <button
        onClick={() => setActiveFilter("all")}
        className={` ${
          (activeTab === "all" || activeTab === null) && "active-tab"
        }`}
      >
        All books
      </button>
      <button
        onClick={() => setActiveFilter(true)}
        className={` ${activeTab === true && "active-tab"}`}
      >
        Read books
      </button>
      <button
        onClick={() => setActiveFilter(false)}
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
