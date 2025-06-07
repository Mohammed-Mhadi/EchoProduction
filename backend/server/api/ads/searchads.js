const express = require('express');
const router = express.Router();
const pool = require('../../config');



router.get('/search', async (req, res) => {
  try {
    const adName = 'summer sale'; // your variable

    const result = await pool.query(
      'SELECT * FROM ads WHERE title ILIKE $1',
      [`%${adName}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// search by adding to the URL 


// router.get('/search', async (req, res) => {
//   try {
//     const { query } = req;
//     const result = await pool.query('SELECT * FROM ads WHERE title ILIKE $1', [`%${query.title}%`]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });




module.exports = router;
