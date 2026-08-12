import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import AttendeeForm from "../components/AttendeeForm";

function AddAttendee() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      await api.post("/attendees", formData);
      navigate("/attendees");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/attendees" className="text-primary text-sm hover:underline">
        &larr; Back to Attendees
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-6">Add New Attendee</h1>

      <AttendeeForm onSubmit={handleSubmit} submitLabel="Add Attendee" />
    </div>
  );
}

export default AddAttendee;
