// Handles login and logout logic

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// POST /api/login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // find the user in the database
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    // compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // create a login token that expires in 8 hours
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login successful",
      token,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong during login" });
  }
}

// POST /api/logout
// Since we use JWT (no sessions stored on the server), logout just
// tells the frontend to delete the token. There is nothing to remove here.
function logout(req, res) {
  res.json({ message: "Logged out successfully" });
}

module.exports = { login, logout };
