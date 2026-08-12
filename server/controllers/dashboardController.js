// Provides the summary numbers shown on the Dashboard page

const db = require("../config/db");

// GET /api/dashboard
async function getDashboardStats(req, res) {
  try {
    const [[eventCount]] = await db.query("SELECT COUNT(*) AS total FROM events");
    const [[attendeeCount]] = await db.query("SELECT COUNT(*) AS total FROM attendees");
    const [[registrationCount]] = await db.query("SELECT COUNT(*) AS total FROM registrations");

    // upcoming events = events whose date is today or later
    const [upcomingEvents] = await db.query(
      `SELECT * FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC LIMIT 5`
    );

    const [[upcomingCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM events WHERE event_date >= CURDATE()"
    );

    res.json({
      totalEvents: eventCount.total,
      totalAttendees: attendeeCount.total,
      totalRegistrations: registrationCount.total,
      upcomingEventsCount: upcomingCount.total,
      upcomingEvents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
}

module.exports = { getDashboardStats };
