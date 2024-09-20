'use client';  // Use this if you're using hooks like useState

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Access() {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAccessCode = 'S0RRY_I_4_G0T'; // Set your access code here

    if (accessCode === correctAccessCode) {
      localStorage.setItem('accessGranted', 'true'); // Store access in localStorage
      router.push('/'); // Redirect to the home page
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Access Code</h2>
        <input
          type="password"
          placeholder="Enter Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="border p-2 w-full rounded-md mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
