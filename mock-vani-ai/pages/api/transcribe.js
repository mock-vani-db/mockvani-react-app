const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Log environment variables for debugging
if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is missing from environment variables');
}

const openai = new OpenAI({
    apiKey: 'sk-OQr_bpCVRyItDNQQQlIKsc9ECcwguaIQsCfxxI9eEoT3BlbkFJ53UQP9adBXHMZQuU9QPeivMKOdZGqbmZFD97dY_j4A',  // Ensure the API key is provided
});


// Configure multer to save uploaded chunks
const upload = multer({ dest: 'uploads/' });

// Route to handle chunked audio uploads and transcriptions
app.post('/api/transcribe-chunk', upload.single('file'), async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const originalFilePath = file.path;
  const newFilePath = path.join(path.dirname(originalFilePath), `${file.filename}.webm`);

  try {
    fs.renameSync(originalFilePath, newFilePath);

    // Transcribe the audio chunk using OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(newFilePath),
      model: 'whisper-1',
    });

    // Send the transcription result back to the client
    res.status(200).json({ text: transcription.text });

    // Clean up the uploaded chunk file
    fs.unlinkSync(newFilePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to transcribe audio chunk.' });

    try {
      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
