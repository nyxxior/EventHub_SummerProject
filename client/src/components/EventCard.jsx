import React from "react";
import { Link } from "react-router-dom";

// Formats a date like 2026-08-01 into "Aug 1, 2026"
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Formats a time like 19:00:00 into "7:00 PM"
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function EventCard({ event, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-primary">{event.event_name}</h3>

      <p className="text-sm text-gray-600">
        📅 {formatDate(event.event_date)} &nbsp;|&nbsp; 🕒 {formatTime(event.event_time)}
      </p>
      <p className="text-sm text-gray-600">📍 {event.location}</p>
      <p className="text-sm text-gray-600">
        👥 {event.registered_count} attendee{event.registered_count === 1 ? "" : "s"} registered
      </p>

      <div className="flex gap-2 mt-3">
        <Link
          to={`/events/${event.id}`}
          className="flex-1 text-center bg-primary text-white text-sm py-2 rounded-md hover:opacity-90"
        >
          View
        </Link>
        <Link
          to={`/events/edit/${event.id}`}
          className="flex-1 text-center bg-secondary text-white text-sm py-2 rounded-md hover:opacity-90"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(event.id)}
          className="flex-1 text-center bg-red-500 text-white text-sm py-2 rounded-md hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
export { formatDate, formatTime };
