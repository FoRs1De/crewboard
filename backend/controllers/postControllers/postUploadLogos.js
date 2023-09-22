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

// Create a multer instance with the defined storage
const upload = multer({ storage: storageLogos });

app.post('/', upload.single('file'), async (req, res) => {
  // The uploaded file can be accessed as req.file
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.file;

  const filename = file.originalname.replace(/[\s/]+/g, '-');

  // File saved successfully
  return res.status(200).json({
    message: 'File uploaded and saved successfully',
    url: `${host}/companies/logos/${filename}`, // Correct file URL
  });
});

module.exports = app;
