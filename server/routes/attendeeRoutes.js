const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getAllAttendees,
  getAttendeeById,
  createAttendee,
  updateAttendee,
  deleteAttendee,
} = require("../controllers/attendeeController");

router.get("/", verifyToken, getAllAttendees);
router.get("/:id", verifyToken, getAttendeeById);
router.post("/", verifyToken, createAttendee);
router.put("/:id", verifyToken, updateAttendee);
router.delete("/:id", verifyToken, deleteAttendee);

module.exports = router;
