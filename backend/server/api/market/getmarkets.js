const express = require('express');
const router = express.Router();
const pool = require('../../config');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM markets');
    res.json(result.rows);
          console.log(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM markets WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Market not found');

    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// how many markets are there

router.get('/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM markets');
    res.json({ totalUsers: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error('Error in /users/count:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
