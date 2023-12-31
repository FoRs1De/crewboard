const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const host = process.env.PROXY_HOST;

// Define the destination and filename functions for multer
const storageLogos = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'companies',
      'logos'
    );
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[\s/]+/g, '-');

    cb(null, sanitizedFilename);
  },
});

const upload = multer({ storage: storageLogos });

app.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.file;

  const filename = file.originalname.replace(/[\s/]+/g, '-');

  return res.status(200).json({
    message: 'File uploaded and saved successfully',
    url: `${host}/companies/logos/${filename}`,
  });
});

module.exports = app;
