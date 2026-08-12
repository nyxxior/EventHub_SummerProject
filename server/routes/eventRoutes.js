const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// every route below requires the user to be logged in
router.get("/", verifyToken, getAllEvents);
router.get("/:id", verifyToken, getEventById);
router.post("/", verifyToken, createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
