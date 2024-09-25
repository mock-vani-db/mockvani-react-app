import React, { useEffect, useRef, useState } from "react";

const AudioRecorder = ({ onTranscription }) => {
  const mediaRecorderRef = useRef(null);
  const [transcription, setTranscription] = useState(
    () => localStorage.getItem("transcription") || ""
  ); // Initialize from localStorage

  useEffect(() => {
    // Start recording as soon as the component mounts
    startRecording();

    // Stop recording when component unmounts
    return () => stopRecording();
  }, []);

  useEffect(() => {
    // Save transcription to localStorage on each update
    localStorage.setItem("transcription", transcription);
  }, [transcription]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          sendChunkToServer(event.data); // Send audio chunks to the server
        }
      };

      mediaRecorderRef.current.start(1000); // Send audio chunks every second
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const sendChunkToServer = async (chunk) => {
    const formData = new FormData();
    formData.append("file", chunk, "audio.webm");

    try {
      const response = await fetch("http://localhost:4000/api/transcribe-chunk", {
        method: "POST",
        body: formData,
      });

      const { text } = await response.json();
      setTranscription((prev) => prev + " " + text);
      onTranscription(text); // Pass the transcription to the parent component
    } catch (error) {
      console.error("Error during transcription:", error);
    }
  };

  return (
    <div className="audio-recorder">
      <p>Recording and transcribing in real-time...</p>
    </div>
  );
};

export default AudioRecorder;
