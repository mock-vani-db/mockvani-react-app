"use client";

import { db } from '../../../../../utils/db';
import { MockVani } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderCircle, Volume2 } from 'lucide-react';
import { FaMicrophoneSlash, FaPhoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaMicrophone } from 'react-icons/fa';
import "./InterviewPage.css";
import { useUser } from "@clerk/nextjs";
import AudioRecorder from "./_components/AudioRecorder";  // Import the AudioRecorder component

function StartInterviewPage() {
    const [interviewData, setInterviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null); // Store generated audio URL
    const [transcribedText, setTranscribedText] = useState('');  // Store transcription text
    const [isMuted, setIsMuted] = useState(false);
    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [webcamError, setWebcamError] = useState(null);
    const { user } = useUser();
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const interviewId = searchParams.get('interviewId');

    const audioRecorderRef = useRef(null);

    const questionsArray = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
    const activeQuestion = questionsArray[activeQuestionIndex]?.question;

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails(interviewId);
        }
        enableVideo();

        // Automatically start recording on page load
        if (audioRecorderRef?.current) {
            audioRecorderRef.current.startRecording();
        }

        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());

            // Stop recording when the component unmounts (e.g., end call)
            if (audioRecorderRef?.current) {
                audioRecorderRef.current.stopAndDownload();
            }
        };
    }, [interviewId]);

    useEffect(() => {
        if (activeQuestion) {
            fetchSpeechFromAPI(activeQuestion);
        }
    }, [activeQuestion]);

    const fetchSpeechFromAPI = async (text) => {
        try {
            setLoading(true);
            const response = await fetch('/api/generateSpeech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }), // Send question text for TTS
            });
            const data = await response.json();
            if (data.url) {
                setAudioUrl(data.url);
                const audio = new Audio(data.url);
                audio.play();
                audio.addEventListener('ended', () => {
                    URL.revokeObjectURL(data.url);
                });
            } else {
                console.error('Error generating speech:', data.error);
            }
        } catch (error) {
            console.error('Failed to generate speech:', error);
        } finally {
            setLoading(false);
        }
    };

    const GetInterviewDetails = async (interviewId) => {
        try {
            const result = await db.select().from(MockVani)
                .where(eq(MockVani.mockId, interviewId));
            if (result.length > 0 && result[0].jsonMockResp) {
                let jsonMockResponse = typeof result[0].jsonMockResp === 'string' ?
                    JSON.parse(result[0].jsonMockResp) : result[0].jsonMockResp;
                if (Array.isArray(jsonMockResponse)) {
                    setMockInterviewQuestion(jsonMockResponse);
                }
                setInterviewData(result[0]);
            }
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVideo = () => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getTracks().find(track => track.kind === 'video');
            if (videoTrack) {
                videoTrack.enabled = !isVideoEnabled;
                setIsVideoEnabled(!isVideoEnabled);
            }
        }
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleScreenShare = () => {
        setIsSharingScreen(!isSharingScreen);
    };

    const handleEndCall = () => {
        if (!interviewId) {
            console.error("Interview ID is missing. Unable to navigate to feedback.");
            return;
        }

        // Stop recording and download final audio file
        if (audioRecorderRef.current) {
            audioRecorderRef.current.stopAndDownload();
        }

        router.push(`/dashboard/interview/${interviewId}/feedback`);
    };

    const enableVideo = async () => {
        try {
            const constraints = { video: true, audio: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
            setWebcamError(null);
        } catch (error) {
            setWebcamError("Error accessing media devices. Please check your camera and microphone settings.");
            console.error("Error accessing media devices:", error);
        }
    };

    const handleTranscription = (transcription) => {
        setTranscribedText(transcription);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className="interview-container">
            {/* Left Window - Questions */}
            <div className="left-window">
                <div className="flex flex-col p-6 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-semibold mb-6">Interview Questions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockInterviewQuestion.length === 0 ? (
                            <p className="text-gray-600 text-lg">No questions available</p>
                        ) : (
                            mockInterviewQuestion.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveQuestionIndex(index)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${activeQuestionIndex === index ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <h2 className="text-center font-semibold text-sm md:text-base">
                                        Question #{index + 1}
                                    </h2>
                                </div>
                            ))
                        )}
                    </div>

                    {activeQuestion ? (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Selected Question:</h3>
                                <Volume2
                                    className="cursor-pointer text-blue-900 hover:text-blue-700 transition-colors duration-300"
                                    onClick={() => fetchSpeechFromAPI(activeQuestion)}
                                    size={24}
                                    title="Play Question"
                                />
                            </div>
                            <p className="text-gray-700 mt-4 text-lg">{activeQuestion}</p>
                        </div>
                    ) : (
                        <p className="mt-8 text-gray-500 text-lg">Please select a question to view its details.</p>
                    )}
                </div>
            </div>

            {/* Right Window - Interviewee Video & Audio Recorder */}
            <div className="right-window">
                <div className="video">
                    <h3 className="flex text-red-50 justify-center">
                        Interviewee View - {user?.primaryEmailAddress?.emailAddress}
                    </h3>
                    {webcamError ? (
                        <p className="text-red-500">{webcamError}</p>
                    ) : (
                        <video ref={videoRef} autoPlay playsInline muted={isMuted} className="video-player"></video>
                    )}
                </div>

                {/* Automatically start recording */}
                <div className="audio-recorder">
                    <AudioRecorder ref={audioRecorderRef} onTranscription={handleTranscription} />
                    {transcribedText && (
                        <div className="mt-4 text-white">
                            <strong>Transcription:</strong> {transcribedText}
                        </div>
                    )}
                </div>
            </div>

            <div className="controls">
                <button onClick={handleEndCall} className="control-button end-call">
                    <FaPhoneSlash />
                </button>
                <button onClick={handleScreenShare} className="control-button screen-share">
                    <FaDesktop />
                </button>
                <button onClick={handleMute} className="control-button mute">
                    {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button onClick={toggleVideo} className="control-button toggle-video">
                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
            </div>
        </div>
    );
}

export default StartInterviewPage;
