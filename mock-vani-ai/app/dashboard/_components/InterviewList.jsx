"use client";
import React, { useEffect, useState } from 'react';
import { UserAnswers, MockVani } from '../../../utils/schema'; // Import both UserAnswers and MockVani schema
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../utils/db';
import InterviewItemCard from './InterviewItemCard';
import AddNewInterview from './AddNewInterview';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      // Fetch all mock interviews from MockVani for the current user
      const mockInterviews = await db.select()
        .from(MockVani)
        .where(eq(MockVani.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockVani.id));

      // Fetch all UserAnswers for the current user to check completion status
      const userAnswers = await db.select()
        .from(UserAnswers)
        .where(eq(UserAnswers.userEmail, user?.primaryEmailAddress?.emailAddress));

      // Map the interviews to check if they are completed based on matching mockId and mockIdRef
      const interviewsWithCompletion = mockInterviews.map(interview => {
        const isCompleted = userAnswers.some(answer => answer.mockIdRef === interview.mockId);
        return { ...interview, isCompleted };
      });

      setInterviewList(interviewsWithCompletion);
    } catch (error) {
      console.error('Error fetching interview list:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">Previous Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {Array.from({ length: 9 }).map((_, index) => {
          if (interviewList[index]) {
            const interview = interviewList[index];

            return (
              <InterviewItemCard
                interview={interview}
                key={index}
                // Add an annotation or badge for completed/incomplete interviews
                annotation={interview.isCompleted ? "Completed" : "Incomplete"}
              />
            );
          }
           else {
            return (
              <div
                key={index}
                className="border-dashed border-2 border-gray-400 shadow-sm rounded-lg p-4 bg-gray-600 text-white cursor-pointer hover:bg-gray-700 transition-all"
              >
                <AddNewInterview />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default InterviewList;
