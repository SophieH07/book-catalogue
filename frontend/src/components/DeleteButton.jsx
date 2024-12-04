import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteButton({ bookId, fetchBooks }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.response);
    }
  };

  return (
    <button
      onClick={() => handleDelete(bookId)}
      className="bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
      title="Delete Book"
    >
      <MdDeleteForever className="h-6 w-6" />
    </button>
  );
}
