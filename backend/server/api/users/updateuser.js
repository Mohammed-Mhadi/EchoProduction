// routes/user.js
const express = require("express");
const router = express.Router();
const pool = require("../../config");

// PATCH /user/:id
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    customer_name,
    customer_role,
    phone,
    profile_image_url,
    customer_location,
    subscription_status,
    stores_number,
  } = req.body;

  try {
    const query = `
      UPDATE users
      SET name = $1,
          role = $2,
          phone = $3,
          profile_image_url = $4,
          location = $5
      WHERE id = $6
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      customer_name,
      customer_role,
      phone,
      profile_image_url,
      customer_location,
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
