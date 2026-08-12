import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <footer className="bg-white border-t mt-10 py-4 text-center text-sm text-gray-500">
      EventHub Nepal &copy; {new Date().getFullYear()} - University Web Development Project
    </footer>
  );
}

export default Footer;
