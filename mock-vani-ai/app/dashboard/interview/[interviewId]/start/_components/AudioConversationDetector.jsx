import React, { useEffect, useRef, useState } from 'react';

const AudioConversationDetector = ({ onAudioBreak }) => {
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const streamRef = useRef(null); // Reference to store the media stream

  const SILENCE_THRESHOLD = 75; // Adjust based on volume sensitivity
  const SILENCE_DELAY = 3500; // Time to consider as a break (in ms)

  useEffect(() => {
    console.log("Component mounted. Starting microphone...");
    startMicrophone();
    
    return () => {
      console.log("Component unmounted. Stopping microphone...");
      stopMicrophone();
      cancelAnimationFrame(animationFrameIdRef.current); // Cancel the animation frame loop
    };
  }, []);

  const startMicrophone = async () => {
    try {
      console.log("Requesting access to the microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // Store the stream reference
      console.log("Microphone access granted. Initializing audio context...");
      
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      console.log("Audio context and analyser initialized. Starting volume monitoring...");
      monitorVolume();
      
      setIsRecording(true);
      console.log("Recording started.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopMicrophone = () => {
    if (microphoneRef.current) {
      console.log("Disconnecting microphone...");
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      console.log("Closing audio context...");
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      console.log("Stopping media stream tracks...");
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks (microphone)
      streamRef.current = null; // Clear the reference to the stream
    }
    clearTimeout(silenceTimeoutRef.current); // Clear any active timeouts
    setIsRecording(false);
    console.log("Recording stopped.");
  };

  const monitorVolume = () => {
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const detectSilence = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const maxVolume = Math.max(...dataArray);

      if (maxVolume < SILENCE_THRESHOLD) {
        if (!silenceTimeoutRef.current) {
        //   console.log(`Silence detected, maxVolume: ${maxVolume} and defultMaxVolume: ${SILENCE_THRESHOLD} . Waiting for ${SILENCE_DELAY} ms to confirm break...`);
          silenceTimeoutRef.current = setTimeout(() => {
            console.log("Confirmed silence. Triggering audio break callback...");
            onAudioBreak();
          }, SILENCE_DELAY);
        }
      } else {
        if (silenceTimeoutRef.current) {
        //   console.log(`Sound detected, maxVolume: ${maxVolume} and defultMaxVolume: ${SILENCE_THRESHOLD}. Clearing silence timeout.`);
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
        }
      }

      // Store the requestAnimationFrame ID and run the loop
      animationFrameIdRef.current = requestAnimationFrame(detectSilence);
    };

    // Start monitoring the volume
    animationFrameIdRef.current = requestAnimationFrame(detectSilence);
  };

  return (
    <div>
      <p>{isRecording ? "Listening for conversation..." : "Microphone is off"}</p>
    </div>
  );
};

export default AudioConversationDetector;
