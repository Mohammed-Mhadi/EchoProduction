// api/users/addnewuser.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage });

router.post('/api/user', upload.single('profile_image'), async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  // Here you can add your DB insertion logic

  res.json({
    message: 'User received successfully',
    data: req.body,
    file: req.file ? req.file.filename : null,
  });
});

module.exports = router;
