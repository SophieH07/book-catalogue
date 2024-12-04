import axios from "axios";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";

export default function ToggleReadButton({ bookId, read, fetchBooks }) {
  const toggleReadStatus = async (id, currentReadStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`, {
        read: !currentReadStatus,
        updatedAt: new Date(),
      });
      fetchBooks();
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };
  return (
    <div className="flex gap-3">
      <button
        onClick={() => toggleReadStatus(bookId, read)}
        className="text-blue-500 hover:text-blue-700 transition"
        title="Toggle Read Status"
      >
        {read ? (
          <FaCheckSquare className="h-7 w-7" />
        ) : (
          <FaRegCheckSquare className="h-7 w-7" />
        )}
      </button>
      <p className="mt-2">{read ? "Read" : "Unread"}</p>
    </div>
  );
}
