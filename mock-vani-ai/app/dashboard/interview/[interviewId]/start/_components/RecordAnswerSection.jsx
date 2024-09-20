import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, WebcamIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { useToast } from "@/hooks/use-toast";
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswers } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const {
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer((prevAns) => prevAns + result.transcript);
        });
    }, [results]);

    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
    const { toast } = useToast();

    const handleEnableWebcam = () => setIsWebcamEnabled(true);
    const handleDisableWebcam = () => setIsWebcamEnabled(false);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        setLoading(true);

        const questionsArray = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
        const feedbackPrompt = `Question: ${questionsArray[activeQuestionIndex]?.question}, 
        User Answer: ${userAnswer}. Based on the question and user's answer, 
        please provide a rating and constructive feedback for improvement. 
        Structure your response in JSON format with 'rating' and 'feedback' fields in the below format:
        {
            "rating": 1,
            "feedback": "The answer is not realistic and lacks credibility. The candidate needs to provide specific examples."
        }`;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const aiFeedback = await result.response.text();
            const jsonFeedbackResponse = JSON.parse(aiFeedback);

            const resp = await db.insert(UserAnswers).values({
                mockIdRef: interviewData.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAnswer: userAnswer,
                feedback: jsonFeedbackResponse?.feedback,
                rating: jsonFeedbackResponse?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy'),
            });

            if (resp) {
                toast('User answer recorded successfully');
            }
        } catch (error) {
            toast('Error: Failed to send feedback');
        }

        setUserAnswer('');
        setLoading(false);
    };

    return (
        <div className="flex flex-col p-6 border rounded-lg shadow-lg bg-white">
            <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5">
                {isWebcamEnabled ? (
                    <Webcam
                        mirrored={true}
                        style={{ height: 300, width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    />
                ) : (
                    <WebcamIcon className="text-gray-400" size={200} style={{ height: 300, width: '100%' }} />
                )}

                <div className="mt-5 flex gap-3">
                    {isWebcamEnabled ? (
                        <Button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600" onClick={handleDisableWebcam}>
                            Disable Webcam
                        </Button>
                    ) : (
                        <Button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600" onClick={handleEnableWebcam}>
                            Enable Webcam
                        </Button>
                    )}
                </div>
            </div>

            <Button variant="outline" className="my-10" onClick={StartStopRecording}>
                {isRecording ? <h2 className="text-red-600 flex gap-2"><Mic /> Recording your answer...</h2> : 'Record Answer'}
            </Button>

            <Button onClick={UpdateUserAnswer} disabled={loading}>
                Submit Answer
            </Button>
        </div>
    );
}

export default RecordAnswerSection;