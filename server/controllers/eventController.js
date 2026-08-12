// Handles everything related to Events (Create, Read, Update, Delete)

const db = require("../config/db");

// GET /api/events
// Returns all events along with how many attendees registered for each one
async function getAllEvents(req, res) {
  try {
    const [events] = await db.query(`
      SELECT e.*, COUNT(r.id) AS registered_count
      FROM events e
      LEFT JOIN registrations r ON r.event_id = e.id
      GROUP BY e.id
      ORDER BY e.event_date ASC
    `);

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching events" });
  }
}

// GET /api/events/:id
// Returns one event along with the list of attendees registered for it
async function getEventById(req, res) {
  try {
    const { id } = req.params;

    const [eventRows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);

    if (eventRows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // get all attendees who registered for this event
    const [attendees] = await db.query(
      `SELECT a.id, a.name, a.email, a.phone
       FROM attendees a
       JOIN registrations r ON r.attendee_id = a.id
       WHERE r.event_id = ?`,
      [id]
    );

    res.json({ event: eventRows[0], attendees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event details" });
  }
}

// POST /api/events
async function createEvent(req, res) {
  try {
    const { event_name, description, event_date, event_time, location } = req.body;

    // simple backend validation, do not trust the frontend alone
    if (!event_name || !event_date || !event_time || !location) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // check that the date is a real date
    if (isNaN(Date.parse(event_date))) {
      return res.status(400).json({ message: "Please enter a valid date" });
    }

    const [result] = await db.query(
      `INSERT INTO events (event_name, description, event_date, event_time, location)
       VALUES (?, ?, ?, ?, ?)`,
      [event_name, description || "", event_date, event_time, location]
    );

    res.status(201).json({ message: "Event created successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event" });
  }
}

// PUT /api/events/:id
async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { event_name, description, event_date, event_time, location } = req.body;

    if (!event_name || !event_date || !event_time || !location) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (isNaN(Date.parse(event_date))) {
      return res.status(400).json({ message: "Please enter a valid date" });
    }

    const [result] = await db.query(
      `UPDATE events
       SET event_name = ?, description = ?, event_date = ?, event_time = ?, location = ?
       WHERE id = ?`,
      [event_name, description || "", event_date, event_time, location, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating event" });
  }
}

// DELETE /api/events/:id
async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting event" });
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
