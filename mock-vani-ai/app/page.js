'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faChartLine, faClipboardList } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessGranted = localStorage.getItem('accessGranted');
    if (!accessGranted) {
      router.push('/access'); // Redirect to the access code page if access is not granted
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-1 py-16 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Mock-Vani-AI</h1>
        <p className="text-lg font-light max-w-2xl mb-12">
          The ultimate AI-powered mock interview platform designed to help you practice, prepare, and succeed in your career journey. Subscribe now to stay ahead!
        </p>
        <Button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 bg-white text-blue-600 font-semibold text-lg rounded-md hover:bg-gray-100 transition duration-300"
        >
          Go to Dashboard
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Mock-Vani-AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              {/* FontAwesome Icon for Interview Preparation */}
              <FontAwesomeIcon icon={faComments} className="text-blue-500 w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Expert-Level Interviews</h3>
              <p className="text-gray-600 mt-2 text-center">
                Get personalized AI-driven mock interviews tailored to your job profile and skillset.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* FontAwesome Icon for Detailed Feedback */}
              <FontAwesomeIcon icon={faClipboardList} className="text-green-500 w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Detailed Feedback</h3>
              <p className="text-gray-600 mt-2 text-center">
                Receive comprehensive feedback on your responses to help you improve and excel.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {/* FontAwesome Icon for Subscription Benefits */}
              <FontAwesomeIcon icon={faChartLine} className="text-purple-500 w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Subscription Benefits</h3>
              <p className="text-gray-600 mt-2 text-center">
                Subscribe to get unlimited mock interviews and stay updated with the latest industry trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Mock-Vani-AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
