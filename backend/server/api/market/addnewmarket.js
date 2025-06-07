const express = require('express');
const router = express.Router();
const pool = require('../../config');

// POST - create a new market with full info and check user_id exists
router.post('/', async (req, res) => {
  const { user_id, name, location, contact_info, description, image_url } = req.body;

  // Validate required fields
  if (!user_id || !name || !location || !contact_info || !description) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    // Verify that the user_id exists in users table
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);
    if (userResult.rows.length === 0) {
      return res.status(400).send('Invalid user_id. User does not exist.');
    }

    // Insert new market
    const insertQuery = `
      INSERT INTO markets 
        (user_id, name, location, contact_info, description, image_url)
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id, user_id, name, location, contact_info, description, image_url, created_at, updated_at, deleted_at
    `;
    const result = await pool.query(insertQuery, [user_id, name, location, contact_info, description, image_url]);

    const newMarket = result.rows[0];

    res.status(201).json(newMarket);
    console.log('Market added:', newMarket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
