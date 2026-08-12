import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import EventForm from "../components/EventForm";

function AddEvent() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      await api.post("/events", formData);
      navigate("/events");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/events" className="text-primary text-sm hover:underline">
        &larr; Back to Events
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-6">Add New Event</h1>

      <EventForm onSubmit={handleSubmit} submitLabel="Create Event" />
    </div>
  );
}

export default AddEvent;
