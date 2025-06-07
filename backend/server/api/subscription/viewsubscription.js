const express = require("express");
const router = express.Router();
const pool = require("../../config");

// GET all subscriptions
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT
          u.id AS user_id,
          u.name AS user_name,
          u.role AS user_role,
          u.occupation AS user_occupation,
          u.firebase_uid AS user_firebase_uid,
          s.plan_type AS subscription_plan_type,
          s.start_date AS subscription_start_date,
          s.end_date AS subscription_end_date,
          s.status AS subscription_status,
          s.paid_amount AS subscription_paid_amount
      FROM
          users u
      INNER JOIN
          subscriptions s ON u.id = s.user_id;
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single subscription by user ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
          u.id AS user_id,
          u.name AS user_name,
          u.role AS user_role,
          u.firebase_uid AS user_firebase_uid,
          s.plan_type AS subscription_plan_type,
          s.start_date AS subscription_start_date,
          s.end_date AS subscription_end_date,
          s.status AS subscription_status,
          s.paid_amount AS subscription_paid_amount
      FROM
          users u
      INNER JOIN
          subscriptions s ON u.id = s.user_id
      WHERE
          u.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
