import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv'; // for environment variables
import fs from 'fs';
import morgan from 'morgan'; // HTTP request logger
import helmet from 'helmet'; // Security-related HTTP headers

dotenv.config(); // Load environment variables from .env file

// File path constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(helmet()); // Adds security-related HTTP headers
app.use(cors()); // CORS handling
app.use(express.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logger

// Check if uploads directory exists; create it if not
const uploadDirectory = join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer for file upload with limits and file filtering
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDFs and Word documents are allowed.'));
    }
  }
});

// Simulated plagiarism detection function
function detectPlagiarism(filePath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const percentage = Math.random() * 100;
      const flaggedSections = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ];
      resolve({ percentage, flaggedSections });
    }, 2000);
  });
}

// POST route to handle file upload and plagiarism detection
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await detectPlagiarism(req.file.path);
    res.json(result);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'File upload error: ' + err.message });
  }
  if (err.message) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

