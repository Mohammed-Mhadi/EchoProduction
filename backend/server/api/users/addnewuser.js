const express = require('express');
const pool = require('../../config.js'); // your Postgres pool
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

function safeUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.error('Failed to delete file:', filePath, err);
  }
}

router.post('/', upload.single('profile_image'), async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      name,
      email,
      role,
      phone,
      occupation,
      subscription_status,
      location,
    } = req.body;

    // Validate required fields
    if (!name || !email || !role || !phone) {
      if (req.file) safeUnlink(req.file.path);
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'role', 'phone'],
        received: { name, email, role, phone },
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      if (req.file) safeUnlink(req.file.path);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Normalize role to lowercase and validate
    const allowedRoles = ['admin', 'user'];
    const normalizedRole = role.toLowerCase();

    if (!allowedRoles.includes(normalizedRole)) {
      if (req.file) safeUnlink(req.file.path);
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Use default subscription status if missing or invalid
    const allowedStatuses = ['active', 'pending', 'cancelled'];
    const normalizedStatus = subscription_status && allowedStatuses.includes(subscription_status.toLowerCase())
      ? subscription_status.toLowerCase()
      : 'pending';

    // Default location if missing
    const userLocation = location?.trim() || 'Unknown';

    const profile_image_url = req.file ? `/uploads/${req.file.filename}` : null;

    await client.query('BEGIN');

    // Insert user
    const userInsertQuery = `
      INSERT INTO users (name, email, role, phone, profile_image_url, occupation, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const userResult = await client.query(userInsertQuery, [
      name.trim(),
      email.trim(),
      normalizedRole,
      phone.trim(),
      profile_image_url,
      occupation ? occupation.trim() : null,
      userLocation,
    ]);
    const userId = userResult.rows[0].id;

    // Insert subscription for this user
    const subscriptionInsertQuery = `
      INSERT INTO subscriptions (user_id, status)
      VALUES ($1, $2)
    `;
    await client.query(subscriptionInsertQuery, [userId, normalizedStatus]);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      userId,
      profileImage: profile_image_url,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    if (req.file) safeUnlink(req.file.path);
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database operation failed', details: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
