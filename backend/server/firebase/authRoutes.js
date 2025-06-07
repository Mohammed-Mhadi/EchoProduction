const express = require("express");
const admin = require("./firebaseAdmin");
const router = express.Router();

const COOKIE_NAME = "session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000; // 5 days

// Create session cookie after login
router.post("/sessionLogin", async (req, res) => {
  const { idToken } = req.body;

  try {
    const expiresIn = COOKIE_MAX_AGE;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    res.cookie(COOKIE_NAME, sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true, // only over HTTPS in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "Session created" });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: "Logged out" });
});

// Middleware to protect routes
function checkAuth(req, res, next) {
  const sessionCookie = req.cookies[COOKIE_NAME] || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      req.user = decodedClaims;
      
      next();
    })
    .catch(() => {
      res.status(401).json({ error: "You don't have the authority" });
    });
}

// Protected route example
router.get("/admin-dashboard", checkAuth, async (req, res) => {
  // check if role is admin from your DB
  const firebaseUid = req.user.uid;

  const query = `SELECT role FROM users WHERE firebase_uid = $1 AND is_deleted = false`;
  const { rows } = await req.pool.query(query, [firebaseUid]);

  if (rows.length === 0 || rows[0].role !== "admin") {
    return res.status(403).json({ error: "You don't have the authority" });
  }

  res.json({ message: "Welcome to admin dashboard" });
});

module.exports = router;
