import React from "react";
import { Link } from "react-router-dom";

// Displays the list of attendees in a simple table
function AttendeeTable({ attendees, onDelete }) {
  if (attendees.length === 0) {
    return <p className="text-gray-500 mt-4">No attendees found.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{attendee.name}</td>
              <td className="px-4 py-3 text-gray-600">{attendee.email}</td>
              <td className="px-4 py-3 text-gray-600">{attendee.phone}</td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/attendees/${attendee.id}`}
                    className="bg-primary text-white px-3 py-1 rounded-md text-xs hover:opacity-90"
                  >
                    View
                  </Link>
                  <Link
                    to={`/attendees/edit/${attendee.id}`}
                    className="bg-secondary text-white px-3 py-1 rounded-md text-xs hover:opacity-90"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(attendee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeTable;
