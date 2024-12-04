import { useState, useEffect } from "react";
import axios from "axios";
import AddNewBookForm from "./components/AddNewBookForm";
import BookList from "./BookList";
import Filter from "./components/Filter";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (filter = "all") => {
    try {
      if (filter != "all") {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/${filter}`
        );
        setBooks(Array.isArray(response.data) ? response.data : []);
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books`
        );
        setBooks(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Catalogue</h1>
      <Filter fetchBooks={fetchBooks} />
      <AddNewBookForm fetchBooks={fetchBooks} />
      <BookList books={books} fetchBooks={fetchBooks} />
    </div>
  );
}

export default App;
