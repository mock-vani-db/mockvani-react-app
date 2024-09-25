"use client";
import '../styles/Dashboard.css'; // Import your CSS file for patterns
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { ChartBar, ClipboardCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../utils/db";
import { UserAnswers } from "../../utils/schema";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [interviewResultsList, setInterviewResultsList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Protect the dashboard page with access code
  useEffect(() => {
    const accessGranted = localStorage.getItem("accessGranted");
    if (!accessGranted) {
      router.push("/access");
    }
  }, [router]);

  useEffect(() => {
    generateBubbles();
  }, []);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const generateBubbles = () => {
    const container = document.querySelector(".bubble-container");
    const screenWidth = window.innerWidth;
  
    let bubbleCount, minBubbleSize, maxBubbleSize;
  
    // Adjust bubble count and sizes based on screen width
    if (screenWidth <= 480) { // Mobile screens
      bubbleCount = 15;
      minBubbleSize = 10; // Bubbles between 10px and 30px
      maxBubbleSize = 30;
    } else if (screenWidth <= 768) { // Tablet screens
      bubbleCount = 25;
      minBubbleSize = 20; // Bubbles between 20px and 50px
      maxBubbleSize = 50;
    } else { // Desktop screens
      bubbleCount = 50;
      minBubbleSize = 30; // Bubbles between 30px and 70px
      maxBubbleSize = 70;
    }
  
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
      bubble.style.top = `${Math.random() * 100}%`;  // Random vertical position
      bubble.style.animationDelay = `${Math.random() * 5}s`; // Random animation delay
  
      // Generate random size between the min and max bubble sizes
      const bubbleSize = Math.random() * (maxBubbleSize - minBubbleSize) + minBubbleSize;
      bubble.style.width = `${bubbleSize}px`;
      bubble.style.height = bubble.style.width;
  
      container.appendChild(bubble);
    }
  };  

   const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(UserAnswers)
      .where(eq(UserAnswers.userEmail, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(UserAnswers.id));

    setInterviewResultsList(result);

    if (result.length > 0) {
      const totalRating = result.reduce(
        (acc, interview) => acc + Number(interview.rating || 0),
        0
      );
      const average = (totalRating / (result.length * 5)) * 100;
      setAverageRating(average.toFixed(1));
    } else {
      setAverageRating(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center py-12 min-h-[50vh] text-center bg-white text-gray-900 shadow-md">
        <h1 className="text-5xl font-bold mb-4">Your Dashboard</h1>
        <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-600">
          Track your progress, manage your mock interviews, and get insights on how to improve your interview skills.
        </p>

        {/* Bubble Container */}
        <div className="bubble-container absolute inset-0 overflow-hidden"></div>
      </section>

      {/* Main Content */}
      <div className="flex-grow py-16 px-8 mx-auto max-w-7xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="flex flex-col space-y-8 h-full">

            {/* Call to Action Section - Create New Interview */}
            <div className="bg-white p-10 shadow-md text-center flex-grow rounded-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-4xl font-semibold text-gray-800 mb-6">Create a New Mock Interview</h3>
              <p className="text-gray-600 mb-6">
                Start a new interview session and receive detailed feedback based on your answers.
              </p>
              <AddNewInterview />
            </div>

            {/* Stats Section (Interviews Completed and Average Score Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Interviews Completed */}
              <div className="bg-gray-100 p-8 shadow-md rounded-md flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-lg">
                <ChartBar className="text-gray-700 w-12 h-12 mb-4" />
                <h4 className="font-medium text-lg text-gray-700">Interviews Completed</h4>
                <p className="text-5xl font-bold text-gray-800 mt-2">{interviewResultsList.length}</p>
              </div>

              {/* Average Score */}
              <div className="bg-gray-100 p-8 shadow-md rounded-md flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-lg">
                <ClipboardCheck className="text-gray-700 w-12 h-12 mb-4" />
                <h4 className="font-medium text-lg text-gray-700">Average Score</h4>
                <p className="text-5xl font-bold text-gray-800 mt-2">{averageRating}%</p>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Interviews */}
          <div className="col-span-2 flex-grow h-full">
            <div className="bg-white p-10 shadow-md text-center flex-grow rounded-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-4xl font-semibold text-gray-800 mb-6">Recent Interviews</h3>
              <p className="text-gray-600 mb-6">Here are the results of your latest interviews.</p>
              
              <InterviewList interviewResultsList={interviewResultsList} />
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container px-3 mx-auto flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mock Vani. All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
