import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto'; // For generating the hash

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a hash from the input text
function generateHash(text) {
  return crypto.createHash('sha256').update(text).digest('hex'); // SHA-256 hash
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // Generate a hash from the input text
      const textHash = generateHash(text);

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      // Use the hash in the filename
      const uniqueFilename = `InterviewQuestions_${textHash}.mp3`;
      const filePath = path.join(process.cwd(), "public", uniqueFilename);
      
      console.log(filePath);

      // Check if the file already exists
      if (!fs.existsSync(filePath)) {
        // Save the audio file if it doesn't already exist
        await fs.promises.writeFile(filePath, buffer);
      }

      // Respond with the path to the generated or existing audio file
      res.status(200).json({ url: `/${uniqueFilename}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate speech" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
