const express = require('express');
const router = express.Router();
const pool = require('../../config');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedules');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
