'use client';
import './styles/HomePage.css'; // Import your CSS file for patterns
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSmileBeam, faChartLine, faClipboardList } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessGranted = localStorage.getItem('accessGranted');
    if (!accessGranted) {
      router.push('/access'); // Redirect to the access code page if access is not granted
    }
  }, [router]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 font-inter text-gray-900">
      {/* Light Animated Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Dots and Waves */}
        <div className="pattern-dots absolute w-36 h-36 bg-yellow-300 rounded-full opacity-10 animate-move-pattern"></div>
        <div className="pattern-dots absolute w-28 h-28 bg-pink-300 rounded-full opacity-15 animate-move-pattern delay-1"></div>
        <div className="pattern-waves absolute w-56 h-56 bg-green-200 rounded-full opacity-20 animate-waves delay-3"></div>
        <div className="pattern-dots absolute w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-move-pattern delay-2"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 mx-6 py-24 text-center bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-3xl">
        <h1 className="text-6xl font-semibold mb-6 text-gray-900">Welcome to Mock Vani</h1>
        <p className="text-xl font-light max-w-3xl mb-12 text-gray-700 leading-relaxed">
          The ultimate AI-powered mock interview platform designed to help you practice, prepare, and succeed in your career journey. Subscribe now to stay ahead!
        </p>
        <Button
          onClick={() => router.push('/dashboard')}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg rounded-full shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition duration-300"
        >
          Go to Dashboard
        </Button>
      </section>

      {/* Features Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 my-6 mx-6 py-24 text-center bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-3xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-16">Why Choose Mock Vani?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-8 transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faComments} className="text-blue-500 w-16 h-16 mb-6" />
              <h3 className="text-2xl font-medium mb-4">Expert-Level Interviews</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Get personalized AI-driven mock interviews tailored to your job profile and skillset.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-8 transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faClipboardList} className="text-green-500 w-16 h-16 mb-6" />
              <h3 className="text-2xl font-medium mb-4">Detailed Feedback</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Receive comprehensive feedback on your responses to help you improve and excel.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-8 transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faSmileBeam} className="text-purple-500 w-16 h-16 mb-6" />
              <h3 className="text-2xl font-medium mb-4">Subscription Benefits</h3>
              <p className="text-center text-gray-600 leading-relaxed">
                Subscribe to get unlimited mock interviews and stay updated with the latest industry trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 py-10 bg-gray-900 text-white text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Mock Vani. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
