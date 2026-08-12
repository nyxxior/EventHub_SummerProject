import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import { formatDate, formatTime } from "../components/EventCard";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [allAttendees, setAllAttendees] = useState([]);
  const [selectedAttendee, setSelectedAttendee] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadEvent();
    loadAllAttendees();
  }, [id]);

  async function loadEvent() {
    try {
      const data = await api.get(`/events/${id}`);
      setEvent(data.event);
      setAttendees(data.attendees);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadAllAttendees() {
    try {
      const data = await api.get("/attendees");
      setAllAttendees(data);
    } catch (err) {
      // not critical, ignore
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedAttendee) {
      setError("Please choose an attendee to register.");
      return;
    }

    try {
      await api.post("/register", { event_id: id, attendee_id: selectedAttendee });
      setMessage("Attendee registered successfully!");
      setSelectedAttendee("");
      loadEvent(); // refresh the attendee list
    } catch (err) {
      setError(err.message);
    }
  }

  if (error && !event) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-red-600">{error}</p>;
  }

  if (!event) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-gray-500">Loading...</p>;
  }

  // attendees who are not yet registered for this event
  const registeredIds = attendees.map((a) => a.id);
  const availableAttendees = allAttendees.filter((a) => !registeredIds.includes(a.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/events" className="text-primary text-sm hover:underline">
        &larr; Back to Events
      </Link>

      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h1 className="text-2xl font-bold text-gray-800">{event.event_name}</h1>
        <p className="text-gray-600 mt-2">{event.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
          <p>📅 {formatDate(event.event_date)}</p>
          <p>🕒 {formatTime(event.event_time)}</p>
          <p>📍 {event.location}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/events/edit/${event.id}`}
            className="bg-secondary text-white px-4 py-2 rounded-md text-sm hover:opacity-90"
          >
            Edit Event
          </Link>
        </div>
      </div>

      {/* registered attendees */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Registered Attendees ({attendees.length})
        </h2>

        {attendees.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">No attendees registered yet.</p>
        ) : (
          <table className="w-full text-sm text-left mb-4">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-3 py-2">{a.name}</td>
                  <td className="px-3 py-2">{a.email}</td>
                  <td className="px-3 py-2">{a.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* register a new attendee for this event */}
        <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-2 mt-4">
          <select
            value={selectedAttendee}
            onChange={(e) => setSelectedAttendee(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">-- Select an attendee to register --</option>
            {availableAttendees.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.email})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:opacity-90"
          >
            Register
          </button>
        </form>

        {message && <p className="text-green-600 text-sm mt-3">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default EventDetails;
