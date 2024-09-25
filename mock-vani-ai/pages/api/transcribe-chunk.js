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

app.post('/api/transcribe-chunk', upload.single('file'), async (req, res) => {
    const { file } = req;

    if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalFilePath = file.path;
    const newFilePath = path.join(path.dirname(originalFilePath), `${file.filename}.webm`);

    try {
        // Rename the file to add the proper extension
        fs.renameSync(originalFilePath, newFilePath);
        // console.log(`File renamed to ${newFilePath}`);

        // Transcribe the audio chunk using OpenAI Whisper API
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(newFilePath),
            model: 'whisper-1'
        });

        // Send the transcription result back to the client
        console.log('Transcription successful:', transcription.text);
        res.status(200).json({ text: transcription.text });

        // Clean up the uploaded chunk file
        fs.unlinkSync(newFilePath);
        // console.log(`File ${newFilePath} deleted after transcription.`);

    } catch (error) {
        // console.error('Error during transcription:', error.message);

        // Attempt to clean up the file even if there's an error
        try {
            if (fs.existsSync(newFilePath)) {
                fs.unlinkSync(newFilePath);
                console.log(`File ${newFilePath} deleted after error.`);
            }
        } catch (cleanupError) {
            console.error('Error cleaning up file:', cleanupError);
        }

        // Return a meaningful error message
        return res.status(500).json({ error: 'Failed to transcribe audio chunk.', details: error.message });
    }
});

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
