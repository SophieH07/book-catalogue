import axios from "axios";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

export default function ToggleReadButton({ bookId, read, fetchBooks }) {
  const toggleReadStatus = async (id, currentReadStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`, {
        read: !currentReadStatus,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };
  return (
    <>
      <button
        onClick={() => toggleReadStatus(bookId, read)}
        className="text-blue-500 hover:text-blue-700 transition"
        title="Toggle Read Status"
      >
        {read ? (
          <FiCheckSquare className="h-5 w-5" />
        ) : (
          <FiSquare className="h-5 w-5" />
        )}
      </button>
      <p className="mt-2">{read ? "Read" : "Unread"}</p>
    </>
  );
}
