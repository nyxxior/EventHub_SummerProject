import React from "react";

// A simple card used on the Dashboard to show one stat number
function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={"text-3xl font-bold mt-2 " + (color || "text-primary")}>{value}</p>
    </div>
  );
}

export default DashboardCard;
