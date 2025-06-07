const express = require('express');
const router = express.Router();
const pool = require('../../config');

router.patch('/:id/deactivate', async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await pool.query(
      `UPDATE users
       SET is_deleted = true,
           updated_at = NOW()
       WHERE id = $1
       RETURNING *;`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User soft deleted successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Soft delete user error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
