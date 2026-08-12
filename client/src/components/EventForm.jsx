import React, { useState } from "react";

// This form is reused for both "Add Event" and "Edit Event" pages.
// initialData is empty for Add, and filled in for Edit.
function EventForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    event_name: initialData?.event_name || "",
    description: initialData?.description || "",
    event_date: initialData?.event_date ? initialData.event_date.slice(0, 10) : "",
    event_time: initialData?.event_time ? initialData.event_time.slice(0, 5) : "",
    location: initialData?.location || "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // basic frontend validation, backend also checks again
    if (!formData.event_name || !formData.event_date || !formData.event_time || !formData.location) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isNaN(Date.parse(formData.event_date))) {
      setError("Please choose a valid date.");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-xl">
      {error && (
        <p className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-md mb-4">{error}</p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
        <input
          type="text"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
          <input
            type="time"
            name="event_time"
            value={formData.event_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Thamel, Kathmandu"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-5 py-2 rounded-md font-medium hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default EventForm;
