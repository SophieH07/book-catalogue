import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [read, setRead] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("coverImage", coverImage);
    formData.append("read", read);

    try {
      await axios.post("/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBooks();
      setTitle("");
      setAuthor("");
      setCoverImage(null);
      setRead(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Catalogue</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Read</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Book
        </button>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Books List</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books?.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              {book.coverImage && (
                <img
                  src={`http://localhost:5000/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mt-2"
                />
              )}
              <p className="mt-2">{book.read ? "Read" : "Unread"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
