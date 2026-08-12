const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { registerAttendee } = require("../controllers/registrationController");

router.post("/", verifyToken, registerAttendee);

module.exports = router;
