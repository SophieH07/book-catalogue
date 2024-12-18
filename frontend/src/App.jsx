import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./BookList";
import Navbar from "./components/Navbar";
import BookPic from "/book.png";

function App() {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (filter = "all") => {
    setActiveTab(filter);
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
    <div className="w-full p-4">
      <div className="flex items-center justify-center mb-4">
        <img src={BookPic} alt="Book Logo" className="max-h-16 max-w-16" />
        <h1 className="text-3xl font-bold text-center">Book Catalogue</h1>
      </div>
      <Navbar activeTab={activeTab} fetchBooks={fetchBooks} />
      {books && <BookList books={books} fetchBooks={fetchBooks} />}
    </div>
  );
}

export default App;
