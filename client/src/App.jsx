import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Attendees from "./pages/Attendees";
import AttendeeDetails from "./pages/AttendeeDetails";
import AddAttendee from "./pages/AddAttendee";
import EditAttendee from "./pages/EditAttendee";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* default route sends users to dashboard, which redirects to login if needed */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/add"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/edit/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendees"
            element={
              <ProtectedRoute>
                <Attendees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendees/add"
            element={
              <ProtectedRoute>
                <AddAttendee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendees/edit/:id"
            element={
              <ProtectedRoute>
                <EditAttendee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendees/:id"
            element={
              <ProtectedRoute>
                <AttendeeDetails />
              </ProtectedRoute>
            }
          />

          {/* any unknown route goes back to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
