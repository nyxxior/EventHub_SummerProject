import React, { useState } from "react";

function AttendeeForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    // simple email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // phone must be digits only
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must contain only digits (7-15 numbers).");
      return;
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-md">
      {error && (
        <p className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-md mb-4">{error}</p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="98XXXXXXXX"
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

export default AttendeeForm;
