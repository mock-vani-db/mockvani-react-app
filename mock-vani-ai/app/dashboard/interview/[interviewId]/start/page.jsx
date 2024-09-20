"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockVani } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { LoaderCircle } from 'lucide-react';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [loading, setLoading] = useState(true);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockVani)
                .where(eq(MockVani.mockId, params.interviewId));

            if (result.length > 0 && result[0].jsonMockResp) {
                let jsonMockResponse;

                // Check if jsonMockResp is a string or already an object/array
                if (typeof result[0].jsonMockResp === 'string') {
                    // Parse the JSON if it's a string
                    jsonMockResponse = JSON.parse(result[0].jsonMockResp);
                } else {
                    // If it's not a string, assume it's already an array/object
                    jsonMockResponse = result[0].jsonMockResp;
                }

                console.log("Parsed JSON:", jsonMockResponse);

                // Ensure it's an array before setting the state
                if (Array.isArray(jsonMockResponse)) {
                    setMockInterviewQuestion(jsonMockResponse);
                } else {
                    console.error("Error: Expected an array but got:", typeof jsonMockResponse);
                }

                setInterviewData(result[0]);
            } else {
                console.error("Error: No data found for interview ID:", params.interviewId);
            }
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionSelect = (index) => {
        setActiveQuestionIndex(index);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10 px-4">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
                {/* Questions Section */}
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <QuestionsSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        onQuestionSelect={handleQuestionSelect}
                    />
                </div>

                {/* Record Answer Section */}
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <RecordAnswerSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                    />
                </div>
            </div>
        </div>
    );
}

export default StartInterview;
