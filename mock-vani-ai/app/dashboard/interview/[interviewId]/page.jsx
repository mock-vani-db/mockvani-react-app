"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockVani } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { LoaderCircle, Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import InCallView from "./start/page";
import { useRouter } from 'next/navigation'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [webCamError, setWebCamError] = useState(false);
  const router=useRouter();

  useEffect(() => {
    (async () => {
      await GetInterviewDetails();
    })();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockVani)
        .where(eq(MockVani.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        setInterviewData(null);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">No Interview Data Found</h2>
      </div>
    );
  }

  const handleGoToInterview = (interviewId) => {
    router.push(`/dashboard/interview/${interviewId}/start?interviewId=${interviewId}`);
  };
  
  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="font-bold text-3xl text-center mb-8">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Interview Info Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col p-6 rounded-lg border gap-4 shadow-lg bg-white">
            <h2 className="text-xl text-gray-500 font-semibold">
              <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
            </h2>
            <h2 className="text-xl text-gray-500">
              <strong>Job Description/Skillset:</strong> {interviewData.jobDescription}
            </h2>
            <h2 className="text-xl text-gray-500">
              <strong>Years of Experience:</strong> {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-6 border rounded-lg bg-yellow-100 shadow-md">
            <h2 className="flex gap-2 items-center text-xl font-semibold">
              <Lightbulb className="text-yellow-600" />
              <strong className="text-yellow-600">Information</strong>
            </h2>
            <p className="mt-4 text-gray-700">{process.env.NEXT_PUBLIC_INFORMATION}</p>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-lg h-80 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
            {webCamEnabled ? (
              <Webcam
                audio={false}
                onUserMedia={() => {
                  setWebCamEnabled(true);
                  setWebCamError(false);
                }}
                onUserMediaError={() => {
                  setWebCamEnabled(false);
                  setWebCamError(true);
                }}
                mirrored={true}
                className="absolute inset-0 w-full h-full rounded-lg"
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user",
                }}
              />
            ) : (
              <WebcamIcon className="text-gray-600" size={96} />
            )}
            {webCamError && (
              <p className="absolute bottom-0 mb-2 w-full text-center text-red-500">
                Unable to access webcam. Please check your browser settings.
              </p>
            )}
          </div>

          {/* Webcam Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setWebCamEnabled(!webCamEnabled)}
            className={`mt-2 ${webCamEnabled
                ? "text-red-500 border-red-500 hover:bg-red-500"
                : "bg-gray-800 text-gray-300 hover:bg-gray-400"
              } hover:text-white transition-colors duration-300`}
          >
            {webCamEnabled ? "Disable" : "Enable"} Web Camera
          </Button>

          {/* Start Interview Button */}
          <div className="mt-6 w-full flex justify-end">
            {/* <Link href={`/dashboard/interview/${params.interviewId}/start?interviewId=${params.interviewId}`}> */}
              <Button className="w-full md:w-auto bg-gray-800 text-gray-300 hover:bg-gray-400 hover:text-gray-900 transition-colors duration-300"
              onClick={()=>handleGoToInterview(params.interviewId)}>
                Start Interview
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
