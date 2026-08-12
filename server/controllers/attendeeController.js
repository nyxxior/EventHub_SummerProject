// Handles everything related to Attendees (Create, Read, Update, Delete)

const db = require("../config/db");

// simple email format check
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// simple phone check, digits only, 7-15 numbers long
function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{7,15}$/;
  return phoneRegex.test(phone);
}

// GET /api/attendees
async function getAllAttendees(req, res) {
  try {
    const [attendees] = await db.query("SELECT * FROM attendees ORDER BY name ASC");
    res.json(attendees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching attendees" });
  }
}

// GET /api/attendees/:id
// Also returns the list of events this attendee registered for
async function getAttendeeById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM attendees WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    const [events] = await db.query(
      `SELECT e.id, e.event_name, e.event_date, e.event_time, e.location
       FROM events e
       JOIN registrations r ON r.event_id = e.id
       WHERE r.attendee_id = ?`,
      [id]
    );

    res.json({ attendee: rows[0], events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching attendee details" });
  }
}

// POST /api/attendees
async function createAttendee(req, res) {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: "Phone number must contain only digits" });
    }

    // check for duplicate email
    const [existing] = await db.query("SELECT id FROM attendees WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "This email is already registered" });
    }

    const [result] = await db.query(
      "INSERT INTO attendees (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );

    res.status(201).json({ message: "Attendee added successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating attendee" });
  }
}

// PUT /api/attendees/:id
async function updateAttendee(req, res) {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: "Phone number must contain only digits" });
    }

    // check if another attendee already uses this email
    const [existing] = await db.query(
      "SELECT id FROM attendees WHERE email = ? AND id != ?",
      [email, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "This email is already used by another attendee" });
    }

    const [result] = await db.query(
      "UPDATE attendees SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json({ message: "Attendee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating attendee" });
  }
}

// DELETE /api/attendees/:id
async function deleteAttendee(req, res) {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM attendees WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.json({ message: "Attendee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting attendee" });
  }
}

module.exports = {
  getAllAttendees,
  getAttendeeById,
  createAttendee,
  updateAttendee,
  deleteAttendee,
};
