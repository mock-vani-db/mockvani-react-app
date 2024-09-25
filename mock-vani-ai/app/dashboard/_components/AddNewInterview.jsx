"use client";
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { chatSession } from '../../../utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '../../../utils/db';
import { MockVani } from '../../../utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [jobPosition, setJobPosition] = useState('Product Manager');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();
    const [openDialog, setOpenDialog] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = `
        Act as an experienced interviewer, an expert in the domain of ${jobPosition}. 
        For the job description: "${jobDescription}", please provide me 
        ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_HARDNESS} 
        interview questions with short answers in the following JSON format:
        {
          {"question": "Question text", "answer": "Answer text"},
          {"question": "Another question", "answer": "Another answer"}
        }
    `;
        try {
            // Send the prompt to Google AI using chatSession.sendMessage
            const result = await chatSession.sendMessage(inputPrompt);
            const mockJsonResponse = await result.response.text();
            let parsedJsonResponse;

            try {
                // Parse the JSON response and check if it's an array
                parsedJsonResponse = JSON.parse(mockJsonResponse);
                if (!Array.isArray(parsedJsonResponse)) {
                    throw new Error("Invalid JSON format: Expected an array of questions.");
                }
            } catch (jsonParseError) {
                console.error("Error parsing JSON response:", jsonParseError);
                setLoading(false);
                return; // Exit if JSON is invalid
            }

            setJsonResponse(parsedJsonResponse);

            if (parsedJsonResponse && Array.isArray(parsedJsonResponse)) {
                // Proceed with inserting the valid response into the database
                const response = await db.insert(MockVani)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: JSON.stringify(parsedJsonResponse), // Save as string
                        jobPosition: jobPosition,
                        jobDescription: jobDescription,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-yyyy'),
                    })
                    .returning({ mockId: MockVani.mockId });


                if (response) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + response[0]?.mockId);
                }
            } else {
                console.log("Error: Parsed response is not an array.");
            }
        } catch (error) {
            console.error("Failed to generate interview questions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-gray-300 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-sm font-bold text-center text-gray-800'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <div />
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-primary mb-4">Tell us more about your Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <h2 className="text-gray-600 mb-6">Add details about your job position/role, job description, and years of experience</h2>

                                {/* Job Role/Job Position Dropdown */}
                                <div className='mt-7 my-3'>
                                    <label className="text-gray-700 font-medium">Job Role/Job Position</label>
                                    <select
                                        required
                                        onChange={(event) => setJobPosition(event.target.value)}
                                        className="mt-2 border border-gray-300 rounded-lg p-3 w-full"
                                    >
                                        <option value="" disabled>Select a Job Role</option>
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="Software Engineer">Software Engineer</option>
                                        <option value="Data Scientist">Data Scientist</option>
                                        <option value="Marketing Manager">Marketing Manager</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                                {/* Job Description */}
                                <div className='my-3'>
                                    <label className="text-gray-700 font-medium">Job Description/Technology</label>
                                    <Textarea
                                        placeholder="Ex. Product Led Growth, Experimentation, etc."
                                        onChange={(event) => setJobDescription(event.target.value)}
                                        className="mt-2 border border-gray-300 rounded-lg p-3 w-full"
                                    />
                                </div>

                                {/* Years of Experience */}
                                <div className='my-3'>
                                    <label className="text-gray-700 font-medium">Years of Experience</label>
                                    <Input
                                        placeholder="Ex. 5"
                                        type="number"
                                        max="35"
                                        onChange={(event) => setJobExperience(event.target.value)}
                                        className="mt-2 border border-gray-300 rounded-lg p-3 w-full"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-5 justify-end'>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpenDialog(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition-all"
                                    >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className='animate-spin mr-2' /> Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
