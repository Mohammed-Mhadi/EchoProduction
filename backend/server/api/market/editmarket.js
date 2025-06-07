const express = require("express");
const router = express.Router();
const pool = require("../../config");

// PATCH update market by ID and delete the subscription for that market's user
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    market_name,
    location,
    contact_info,
    description,
    image_url,
  } = req.body;

  try {
    await pool.query("BEGIN");

    // Update markets table
    const marketUpdateQuery = `
      UPDATE markets
      SET name = $1,
          location = $2,
          contact_info = $3,
          description = $4,
          image_url = $5,
          updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;

    const { rows: marketRows } = await pool.query(marketUpdateQuery, [
      market_name,
      location,
      contact_info,
      description,
      image_url || null,
      id,
    ]);

    if (marketRows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Market not found" });
    }

    const marketUserId = marketRows[0].user_id;

    // Delete subscription for the market's user_id
    const deleteSubscriptionQuery = `
      DELETE FROM subscriptions
      WHERE user_id = $1
      RETURNING *;
    `;

    const { rows: deletedSubscriptionRows } = await pool.query(deleteSubscriptionQuery, [
      marketUserId,
    ]);

    if (deletedSubscriptionRows.length === 0) {
      console.warn("No subscription found for this market's user to delete.");
    }

    await pool.query("COMMIT");

    res.json({
      message: "Market updated and subscription deleted successfully",
      market: marketRows[0],
      deleted_subscription: deletedSubscriptionRows[0] || null,
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
