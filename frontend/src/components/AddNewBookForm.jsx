import { useState } from "react";
import axios from "axios";

export default function AddNewBookForm({ fetchBooks, showAddForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [read, setRead] = useState(false);

  const handleSubmit = async (e) => {
    const date = new Date();
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("coverImage", coverImage);
    formData.append("read", read);
    formData.append("createdAt", date);
    formData.append("updatedAt", date);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBooks();
      setTitle("");
      setAuthor("");
      setCoverImage(null);
      setRead(false);
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response ? error.response.data : error
      );
    }
  };
  return (
    <div
      className={`${
        showAddForm ? "flex items-center justify-center" : "hidden"
      }  `}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-opacity-15 bg-white p-4 rounded-lg shadow-md"
      >
        <div className="grid gap-2 w-full mb-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cover Image</label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>
          <div
            className="flex items-center pt-6 cursor-pointer"
            onClick={() => setRead((prev) => !prev)}
          >
            <input
              type="checkbox"
              checked={read}
              onChange={(e) => setRead(e.target.checked)}
              className="mr-4 h-8 w-8 cursor-pointer"
            />
            <label className="cursor-pointer">Read</label>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
}
