// This middleware checks if the user sent a valid login token.
// If not, we block access to the route (send 401 Unauthorized).

const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  // the frontend sends the token like this: "Authorization: Bearer <token>"
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Please login." });
  }

  const token = authHeader.split(" ")[1]; // get the part after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "No token provided. Please login." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token. Please login again." });
    }

    // save the decoded user info so other routes can use it
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
