const express = require("express");
const router = express.Router();
const pool = require("../../config");

// POST add new subscription
router.post("/add", async (req, res) => {
  const { user_id, plan_type, start_date, end_date, status, paid_amount } = req.body;

  try {
    // Insert the subscription
    const insertQuery = `
      INSERT INTO subscriptions (user_id, plan_type, start_date, end_date, status, paid_amount)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows: subscriptionRows } = await pool.query(insertQuery, [
      user_id,
      plan_type,
      start_date,
      end_date,
      status,
      paid_amount,
    ]);

    const newSubscription = subscriptionRows[0];

    // Get the user name from the users table
    const userQuery = `
      SELECT name FROM users WHERE id = $1;
    `;
    const { rows: userRows } = await pool.query(userQuery, [user_id]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the user_name to the subscription data
    const result = {
      ...newSubscription,
      user_name: userRows[0].name,
    };

    res.status(201).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
