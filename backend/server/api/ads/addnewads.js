const express = require('express');
const router = express.Router();
const pool = require('../../config');  // your PostgreSQL pool connection

// POST / - Insert new ad
router.post('/', async (req, res) => {
  try {
    const {
      market_id,
      title,
      description = null,
      created_by,
      is_deleted = false,
    } = req.body;

    // Basic validation
    if (!market_id || !title || !created_by) {
      return res.status(400).json({ error: 'market_id, title, and created_by are required' });
    }

    const created_at = new Date();

    const queryText = `
      INSERT INTO ads (market_id, title, description, created_by, is_deleted, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [market_id, title, description, created_by, is_deleted, created_at];

    const result = await pool.query(queryText, values);

    res.status(201).json({ message: 'Ad inserted successfully', ad: result.rows[0] });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
