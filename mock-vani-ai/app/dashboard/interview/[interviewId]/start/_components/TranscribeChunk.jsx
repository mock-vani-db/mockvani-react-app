import { useState, useRef, useEffect } from 'react';

function TranscribeChunk() {
    const [recording, setRecording] = useState(false);
    const [transcriptions, setTranscriptions] = useState([]);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    // Start recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            chunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            handleAudioChunk();
        };

        mediaRecorderRef.current.start(1000); // Collect data in chunks every 1 second
        setRecording(true);
    };

    // Stop recording
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    // Send audio chunk to server for transcription
    const handleAudioChunk = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', blob, 'chunk.webm');

        try {
            const response = await fetch('/api/transcribe-chunk', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setTranscriptions((prev) => [...prev, result.text]);

            // Clear chunks after transcription
            chunksRef.current = [];
        } catch (error) {
            console.error('Error transcribing audio chunk:', error);
        }
    };

    return (
        <div className="transcribe-container">
            <h1>Stream Transcription</h1>
            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
            <div className="transcriptions">
                {transcriptions.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    );
}

export default TranscribeChunk;
