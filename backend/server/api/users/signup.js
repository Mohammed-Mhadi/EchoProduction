// ./api/users/signup.js
const express = require('express');
const pool = require('../../config.js'); // your Postgres pool

const router = express.Router();

router.post('/', async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      firebase_uid,
      name,
      email,
      phone,
      location,
    } = req.body;

    // Validate required fields
    if (!firebase_uid || !name || !email || !phone) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firebase_uid', 'name', 'email', 'phone'],
        received: { firebase_uid, name, email, phone },
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Default location if missing
    const userLocation = location?.trim() || 'Unknown';

    await client.query('BEGIN');

    // Check if user with this firebase_uid or email exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1 OR email = $2',
      [firebase_uid, email]
    );

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'User with this Firebase UID or email already exists' });
    }

    // Insert user with default role 'user'
    const userInsertQuery = `
      INSERT INTO users (firebase_uid, name, email, phone, location, role)
      VALUES ($1, $2, $3, $4, $5, 'user')
      RETURNING id
    `;
    const userResult = await client.query(userInsertQuery, [
      firebase_uid,
      name.trim(),
      email.trim(),
      phone.trim(),
      userLocation,
    ]);
    const userId = userResult.rows[0].id;

    // Insert subscription with default status 'pending'
    const subscriptionInsertQuery = `
      INSERT INTO subscriptions (user_id, status)
      VALUES ($1, 'pending')
    `;
    await client.query(subscriptionInsertQuery, [userId]);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      userId,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Database operation failed', details: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
