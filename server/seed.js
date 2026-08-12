// This script creates the default admin user in the database.
// We keep it separate from the .sql file because the password
// needs to be hashed with bcrypt before it is saved.
//
// How to run it:
//   1. cd server
//   2. npm install
//   3. node seed.js

const bcrypt = require("bcrypt");
const db = require("./config/db");

async function createAdmin() {
  try {
    const username = "admin";
    const plainPassword = "admin123"; // default password for viva/demo

    // hash the password before saving it, never save plain text passwords
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // check if admin already exists so we don't create duplicates
    const [existing] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (existing.length > 0) {
      console.log("Admin user already exists. Nothing to do.");
      process.exit();
    }

    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    console.log("Admin user created successfully!");
    console.log("Username:", username);
    console.log("Password:", plainPassword);
    process.exit();
  } catch (err) {
    console.error("Error creating admin user:", err);
    process.exit(1);
  }
}

createAdmin();
