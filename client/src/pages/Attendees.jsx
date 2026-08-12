import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import AttendeeTable from "../components/AttendeeTable";
import SearchBar from "../components/SearchBar";

function Attendees() {
  const [attendees, setAttendees] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendees();
  }, []);

  async function loadAttendees() {
    try {
      setLoading(true);
      const data = await api.get("/attendees");
      setAttendees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this attendee?");
    if (!confirmed) return;

    try {
      await api.delete(`/attendees/${id}`);
      setAttendees(attendees.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  const filteredAttendees = attendees.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendees</h1>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name..." />
          <Link
            to="/attendees/add"
            className="whitespace-nowrap bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            + Add Attendee
          </Link>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">Loading attendees...</p>}

      {!loading && <AttendeeTable attendees={filteredAttendees} onDelete={handleDelete} />}
    </div>
  );
}

export default Attendees;
