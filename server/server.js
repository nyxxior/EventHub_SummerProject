// This is the main entry file for our Express backend server

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const attendeeRoutes = require("./routes/attendeeRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// middleware
app.use(cors()); // allows our React app to call this API
app.use(express.json()); // lets us read JSON from the request body

// test route to check if server is running
app.get("/", (req, res) => {
  res.send("EventHub API is running...");
});

// connect our routes
app.use("/api", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/register", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EventHub server is running on http://localhost:${PORT}`);
});
