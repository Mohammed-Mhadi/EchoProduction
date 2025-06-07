const express = require('express');
const pool = require('../../config.js'); // Postgres pool
const admin = require('../../firebase/firebaseAdmin.js'); // Firebase Admin SDK


const router = express.Router();

router.post('/', async (req, res) => {
  const { idToken } = req.body;

  // Basic validation
  if (!idToken) {
    return res.status(400).json({ error: 'ID token required' });
  }

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    if (!email || !uid) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }
  console.log("Decoded Firebase token:", decodedToken);
  console.log("Querying for user with:", email, uid);
    // Check if user exists in your database
    const userQuery = 'SELECT * FROM users WHERE LOWER(email) = $1 AND firebase_uid = $2';
    const userResult = await pool.query(userQuery, [email.toLowerCase(), uid]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'User Will not pass' });
    }

    const user = userResult.rows[0];

    res.status(200).json({
      success: true,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


