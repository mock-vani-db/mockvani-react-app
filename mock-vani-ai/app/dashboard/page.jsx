"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddNewInterview from './_components/AddNewInterview';
import { ChartBar, ClipboardCheck } from 'lucide-react'; // Example icons

function Dashboard() {

  const router = useRouter();

  // Protect the dashboard page with access code
  useEffect(() => {
    const accessGranted = localStorage.getItem('accessGranted');
    if (!accessGranted) {
      router.push('/access'); // Redirect to access page if the access code is not present
    }
  }, [router]);


  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      {/* Main Content */}
      <div className="flex-grow p-10">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
        </div>

        <p className="text-gray-700 mb-4">
          Start your AI-powered mock interviews and track your performance.
        </p>

        {/* Add New Interview Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Create New Mock Interview</h3>
          <AddNewInterview />
        </div>

        {/* Recent Interviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h3 className="font-semibold text-xl text-blue-900 mb-2">Recent Interviews</h3>
          <p className="text-gray-600">
            No recent interviews available. Start a new mock interview to see the results here.
          </p>
        </div>

        {/* Performance Metrics / Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interviews Completed */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
            <ChartBar className="text-primary w-12 h-12 mb-4" />
            <h4 className="font-medium text-lg text-gray-700">Interviews Completed</h4>
            <p className="text-4xl font-bold text-primary mt-2">5</p>
          </div>

          {/* Average Score */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
            <ClipboardCheck className="text-primary w-12 h-12 mb-4" />
            <h4 className="font-medium text-lg text-gray-700">Average Score</h4>
            <p className="text-4xl font-bold text-primary mt-2">78%</p>
          </div>
        </div>
      </div>

      {/* Footer Section (fixed at the bottom) */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Mock-Vani-AI. All Rights Reserved.</p>
            <div className="space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
