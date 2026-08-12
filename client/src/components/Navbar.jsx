import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  // don't show the navbar on the login page
  if (location.pathname === "/login") {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }

  const linkClass = (path) =>
    "px-3 py-2 rounded-md text-sm font-medium " +
    (location.pathname.startsWith(path)
      ? "bg-white text-primary"
      : "text-white hover:bg-blue-800");

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-white text-xl font-bold">
            Event<span className="text-secondary">Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/events" className={linkClass("/events")}>
              Events
            </Link>
            <Link to="/attendees" className={linkClass("/attendees")}>
              Attendees
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white text-sm hidden sm:inline">
              Hi, {username || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-secondary text-white px-3 py-2 rounded-md text-sm font-medium hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
