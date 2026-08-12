import React from "react";

// A simple reusable search input.
// The parent page keeps the actual search text in its own state.
function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}

export default SearchBar;
