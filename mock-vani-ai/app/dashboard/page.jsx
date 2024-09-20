import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import { ChartBar, ClipboardCheck } from 'lucide-react';  // Example icons

function Dashboard() {
  return (
    <div className="p-10 bg-neutral-100 min-h-screen">
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
        <p className="text-gray-600">No recent interviews available. Start a new mock interview to see the results here.</p>
      </div>

      {/* Performance Metrics / Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interviews Completed */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <ChartBar className="text-primary w-12 h-12 mr-4" />
          <div>
            <h4 className="font-medium text-lg text-gray-700">Interviews Completed</h4>
            <p className="text-4xl font-bold text-primary mt-2">5</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <ClipboardCheck className="text-primary w-12 h-12 mr-4" />
          <div>
            <h4 className="font-medium text-lg text-gray-700">Average Score</h4>
            <p className="text-4xl font-bold text-primary mt-2">78%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
