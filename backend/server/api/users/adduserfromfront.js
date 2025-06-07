const express = require('express');
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure upload directory
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration with proper field handling
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
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Create user endpoint
router.post('/', upload.single('profile_image'), async (req, res) => {
  const client = await pool.connect();
  
  try {
    // Log complete request for debugging
    console.log('Raw request body:', req.body);
    console.log('Uploaded file:', req.file);

    // SAFELY access form fields (don't destructure)
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const phone = req.body.phone;
    const occupation = req.body.occupation;
    const subscription_status = req.body.subscription_status;
    const location = req.body.location;

    // Validate required fields
    if (!name || !email || !role || !phone) {
      // Clean up any uploaded file
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'role', 'phone'],
        received: { name, email, role, phone }
      });
    }

    const profile_image_url = req.file ? `/uploads/${req.file.filename}` : null;

    await client.query('BEGIN');

    // Insert user
    const userQuery = `
      INSERT INTO users (name, email, role, phone, profile_image_url, occupation)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const userResult = await client.query(userQuery, [
      name, email, role, phone, profile_image_url, occupation || null
    ]);
    const userId = userResult.rows[0].id;

    // Insert subscription
    await client.query(
      'INSERT INTO subscriptions (user_id, status) VALUES ($1, $2)',
      [userId, subscription_status || 'No Subscription']
    );

    // Insert location if provided
    if (location) {
      await client.query(
        'INSERT INTO locations (user_id, city) VALUES ($1, $2)',
        [userId, location]
      );
    }

    await client.query('COMMIT');
    
    res.status(201).json({
      success: true,
      userId,
      profileImage: profile_image_url
    });

  } catch (error) {
    await client.query('ROLLBACK');
    // Clean up file if error occurred
    if (req.file) fs.unlinkSync(req.file.path);
    
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Database operation failed',
      details: error.message
    });
  } finally {
    client.release();
  }
});

module.exports = router;