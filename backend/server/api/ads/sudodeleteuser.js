// PATCH /users/:id/delete  -- mark user as deleted
router.patch('/:id/delete', async (req, res) => {
  try {
    const userId = req.params.id;

    const queryText = `
      UPDATE users
      SET is_deleted = TRUE, updated_at = NOW()
      WHERE id = $1 AND is_deleted = FALSE
      RETURNING *;
    `;

    const result = await pool.query(queryText, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or already deleted' });
    }

    res.json({ message: 'User soft-deleted successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Soft delete error:', err);
    res.status(500).send('Server error');
  }
});
