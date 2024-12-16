import { useState } from "react";
import Filter from "./Filter";
import AddNewBookForm from "./AddNewBookForm";

export default function Navbar({ activeTab, fetchBooks }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  return (
    <>
      <Filter
        activeTab={activeTab}
        fetchBooks={fetchBooks}
        showAddForm={showAddForm}
        toggleShowAddForm={toggleShowAddForm}
      />
      <AddNewBookForm fetchBooks={fetchBooks} showAddForm={showAddForm} />
    </>
  );
}
