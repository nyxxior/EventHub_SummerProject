import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import AttendeeForm from "../components/AttendeeForm";

function EditAttendee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendee, setAttendee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAttendee();
  }, [id]);

  async function loadAttendee() {
    try {
      const data = await api.get(`/attendees/${id}`);
      setAttendee(data.attendee);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(formData) {
    try {
      await api.put(`/attendees/${id}`, formData);
      navigate(`/attendees/${id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  if (error) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-red-600">{error}</p>;
  }

  if (!attendee) {
    return <p className="max-w-4xl mx-auto px-4 py-8 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to={`/attendees/${id}`} className="text-primary text-sm hover:underline">
        &larr; Back to Attendee
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-6">Edit Attendee</h1>

      <AttendeeForm initialData={attendee} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditAttendee;
