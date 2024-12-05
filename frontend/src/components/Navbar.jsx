import { useState } from "react";
import Filter from "./Filter";
import AddNewBookForm from "./AddNewBookForm";

export default function Navbar({ fetchBooks }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  return (
    <div>
      <Filter
        fetchBooks={fetchBooks}
        showAddForm={showAddForm}
        toggleShowAddForm={toggleShowAddForm}
      />
      <AddNewBookForm fetchBooks={fetchBooks} showAddForm={showAddForm} />
    </div>
  );
}
