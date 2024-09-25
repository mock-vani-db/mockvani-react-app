import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto'; // For generating the hash

const openai = new OpenAI({
  apiKey: 'sk-OQr_bpCVRyItDNQQQlIKsc9ECcwguaIQsCfxxI9eEoT3BlbkFJ53UQP9adBXHMZQuU9QPeivMKOdZGqbmZFD97dY_j4A',  // Ensure the API key is provided
});

function generateHash(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const textHash = generateHash(text);

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());

      const uniqueFilename = `InterviewQuestions_${textHash}.mp3`;
      const filePath = path.join(process.cwd(), "public", uniqueFilename);

      // If the file doesn't already exist, create it
      if (!fs.existsSync(filePath)) {
        await fs.promises.writeFile(filePath, buffer);
      }

      // Send back the URL to the generated audio file
      res.status(200).json({ url: `/${uniqueFilename}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate speech" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
