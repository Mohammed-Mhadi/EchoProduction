const express = require("express");
const router = express.Router();
const pool = require("../config")

// Your PostgreSQL pool connection
router.get("api", async (req, res) => {
  const { firebaseUid } = req.params;

  try {
    const query = `
      SELECT role FROM users WHERE firebase_uid = $1 AND is_deleted = false
    `;
    const { rows } = await pool.query(query, [firebaseUid]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ role: rows[0].role });
  } catch (error) {
    console.error("Error fetching user role by firebase UID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

});


module.exports = router;