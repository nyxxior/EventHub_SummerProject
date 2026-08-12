import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      const data = await api.get("/events");
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await api.delete(`/events/${id}`);
      // remove it from the list without reloading the whole page
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  // filter events by name based on the search box
  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Events</h1>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by event name..." />
          <Link
            to="/events/add"
            className="whitespace-nowrap bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            + Add Event
          </Link>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">Loading events...</p>}

      {!loading && filteredEvents.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Events;
