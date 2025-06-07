const express = require('express');
const router = express.Router();
const pool = require('../../config');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// how to get how many devices 
router.get('/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM devices');
    res.json({ totalUsers: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error('Error in /users/count:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
