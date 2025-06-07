const express = require("express");
const router = express.Router();
const pool = require("../../config");

// PATCH update user and subscription by user ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    user_name,
    user_role,
    user_occupation,
    subscription_plan_type,
    subscription_start_date,
    subscription_end_date,
    subscription_status,
    subscription_paid_amount,
  } = req.body;

  try {
    await pool.query("BEGIN");

    // Update users table
    const userUpdateQuery = `
      UPDATE users
      SET name = $1,
          role = $2,
          occupation = $3
      WHERE id = $4
      RETURNING *;
    `;

    const { rows: userRows } = await pool.query(userUpdateQuery, [
      user_name,
      user_role,
      user_occupation,
      id,
    ]);

    if (userRows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    // Update subscriptions table
    const subscriptionUpdateQuery = `
      UPDATE subscriptions
      SET plan_type = $1,
          start_date = $2,
          end_date = $3,
          status = $4,
          paid_amount = $5
      WHERE user_id = $6
      RETURNING *;
    `;

    const { rows: subscriptionRows } = await pool.query(subscriptionUpdateQuery, [
      subscription_plan_type,
      subscription_start_date,
      subscription_end_date,
      subscription_status,
      subscription_paid_amount,
      id,
    ]);

    if (subscriptionRows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Subscription not found for this user" });
    }

    await pool.query("COMMIT");

    res.json({
      message: "Subscription and user updated successfully",
      user: userRows[0],
      subscription: subscriptionRows[0],
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
