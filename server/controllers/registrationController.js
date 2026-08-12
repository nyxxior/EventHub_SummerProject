// Handles registering an attendee for an event

const db = require("../config/db");

// POST /api/register
async function registerAttendee(req, res) {
  try {
    const { event_id, attendee_id } = req.body;

    if (!event_id || !attendee_id) {
      return res.status(400).json({ message: "event_id and attendee_id are required" });
    }

    // make sure the event exists
    const [eventRows] = await db.query("SELECT id FROM events WHERE id = ?", [event_id]);
    if (eventRows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // make sure the attendee exists
    const [attendeeRows] = await db.query("SELECT id FROM attendees WHERE id = ?", [attendee_id]);
    if (attendeeRows.length === 0) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    // check if already registered
    const [existing] = await db.query(
      "SELECT id FROM registrations WHERE event_id = ? AND attendee_id = ?",
      [event_id, attendee_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "This attendee is already registered for this event" });
    }

    await db.query(
      "INSERT INTO registrations (event_id, attendee_id) VALUES (?, ?)",
      [event_id, attendee_id]
    );

    res.status(201).json({ message: "Attendee registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering attendee" });
  }
}

module.exports = { registerAttendee };
