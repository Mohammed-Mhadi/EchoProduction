const express = require('express');
const router = express.Router();
const pool = require('../../config.js');

router.post('/signin', async (req, res) => {
  try {
    const { firebase_uid, email } = req.body;

    if (!firebase_uid || !email) {
      return res.status(400).json({ error: 'firebase_uid and email are required' });
    }

    // Try to find the user
    const findUser = await pool.query(
      'SELECT * FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );

    if (findUser.rows.length > 0) {
      return res.status(200).json(findUser.rows[0]); // ✅ Return existing user
    }

    // If user doesn't exist, create them
    const newUser = await pool.query(
      `INSERT INTO users (firebase_uid, email, role) 
       VALUES ($1, $2, $3) RETURNING *`,
      [firebase_uid, email, 'user']
    );

    return res.status(201).json(newUser.rows[0]); // ✅ Return created user
  } catch (err) {
    console.error('Sign-in error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
