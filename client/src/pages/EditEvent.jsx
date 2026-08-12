import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import EventForm from "../components/EventForm";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvent();
  }, [id]);

  async function loadEvent() {
    try {
      const data = await api.get(`/events/${id}`);
      setEvent(data.event);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(formData) {
    try {
      await api.put(`/events/${id}`, formData);
      navigate(`/events/${id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  if (error) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-red-600">{error}</p>;
  }

  if (!event) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to={`/events/${id}`} className="text-primary text-sm hover:underline">
        &larr; Back to Event
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-6">Edit Event</h1>

      <EventForm initialData={event} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditEvent;
