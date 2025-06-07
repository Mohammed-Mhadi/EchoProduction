const express = require("express");
const router = express.Router();
const pool = require("../../config");

router.get("/", async (req, res) => {
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
      GROUP BY u.id, u.name, u.role, u.phone, u.profile_image_url, u.location
      ORDER BY u.id;
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
