import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import { formatDate, formatTime } from "../components/EventCard";

function AttendeeDetails() {
  const { id } = useParams();
  const [attendee, setAttendee] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendee();
  }, [id]);

  async function loadAttendee() {
    try {
      const data = await api.get(`/attendees/${id}`);
      setAttendee(data.attendee);
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p className="max-w-3xl mx-auto px-4 py-8 text-red-600">{error}</p>;
  }

  if (!attendee) {
    return <p className="max-w-3xl mx-auto px-4 py-8 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/attendees" className="text-primary text-sm hover:underline">
        &larr; Back to Attendees
      </Link>

      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">{attendee.name}</h1>
        <p className="text-gray-600 mt-2">✉️ {attendee.email}</p>
        <p className="text-gray-600">📞 {attendee.phone}</p>

        <Link
          to={`/attendees/edit/${attendee.id}`}
          className="inline-block mt-4 bg-secondary text-white px-4 py-2 rounded-md text-sm hover:opacity-90"
        >
          Edit Attendee
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Registered Events ({events.length})
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">Not registered for any events yet.</p>
        ) : (
          <ul className="divide-y">
            {events.map((event) => (
              <li key={event.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{event.event_name}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(event.event_date)} • {formatTime(event.event_time)} • {event.location}
                  </p>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:opacity-90"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AttendeeDetails;
