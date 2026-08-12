import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import DashboardCard from "../components/DashboardCard";
import { formatDate, formatTime } from "../components/EventCard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await api.get("/dashboard");
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p className="max-w-6xl mx-auto px-4 py-8 text-red-600">{error}</p>;
  }

  if (!stats) {
    return <p className="max-w-6xl mx-auto px-4 py-8 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Events" value={stats.totalEvents} />
        <DashboardCard title="Total Attendees" value={stats.totalAttendees} color="text-secondary" />
        <DashboardCard title="Total Registrations" value={stats.totalRegistrations} />
        <DashboardCard title="Upcoming Events" value={stats.upcomingEventsCount} color="text-secondary" />
      </div>

      {/* upcoming events list */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
          <Link to="/events" className="text-sm text-primary hover:underline">
            View all events
          </Link>
        </div>

        {stats.upcomingEvents.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming events.</p>
        ) : (
          <ul className="divide-y">
            {stats.upcomingEvents.map((event) => (
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

export default Dashboard;
