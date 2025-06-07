const express = require("express");
const router = express.Router();
const pool = require("../../config");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        u.id AS customer_id,
        u.name AS customer_name,
        u.role::text AS customer_role,
        u.phone,
        u.profile_image_url,
        u.location AS customer_location,
        COALESCE(MAX(s.status::text), 'No Subscription') AS subscription_status,
        COUNT(DISTINCT m.id) AS stores_number
      FROM users u
      LEFT JOIN subscriptions s ON s.user_id = u.id
      LEFT JOIN markets m ON m.user_id = u.id
      WHERE u.id = $1
      GROUP BY u.id, u.name, u.role, u.phone, u.profile_image_url, u.location;
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
