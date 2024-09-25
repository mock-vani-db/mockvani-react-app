"use client";
import '../../styles/Dashboard.css'; // Import your CSS file for patterns
import React, { useEffect, useState } from 'react';

function Forum() {
  useEffect(() => {
    generateBubbles();
  }, []);

  const generateBubbles = () => {
    const container = document.querySelector(".bubble-container");
    const screenWidth = window.innerWidth;

    let bubbleCount, minBubbleSize, maxBubbleSize;

    // Adjust bubble count and sizes based on screen width
    if (screenWidth <= 480) { // Mobile screens
      bubbleCount = 5;
      minBubbleSize = 10; // Bubbles between 10px and 30px
      maxBubbleSize = 30;
    } else if (screenWidth <= 768) { // Tablet screens
      bubbleCount = 10;
      minBubbleSize = 20; // Bubbles between 20px and 50px
      maxBubbleSize = 50;
    } else { // Desktop screens
      bubbleCount = 25;
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

  // Sample data for job roles and discussions
  const jobRoles = [
    {
      role: 'Software Engineer',
      threads: [
        { id: 1, title: 'Best Tips for Cracking System Design Interviews', author: 'Saroj', replies: 25, views: 420, recentReply: 'Gautam: Focus on scalability and distributed systems concepts!' },
        { id: 2, title: 'Leetcode Patterns for Technical Interviews', author: 'Baba', replies: 18, views: 290, recentReply: 'Nayan: Arrays, Trees, and Graphs are essential!' },
        { id: 3, title: 'How to Prepare for Whiteboard Interviews?', author: 'John', replies: 13, views: 200, recentReply: 'David: Practice with mock interviews!' },
        { id: 4, title: 'Interview Prep for Junior Developers', author: 'Alex', replies: 8, views: 180, recentReply: 'Sarah: Focus on basic data structures and algorithms!' },
        { id: 5, title: 'Mock Vani Review Thread', author: 'Steve', replies: 35, views: 800, recentReply: 'Mark: This platform really helped me!' },
        { id: 6, title: 'What are the key interview topics?', author: 'Sophia', replies: 12, views: 150, recentReply: 'James: Data structures and algorithms for sure!' },
      ],
    },
    {
      role: 'Data Scientist',
      threads: [
        { id: 1, title: 'Best Resources for Learning Machine Learning', author: 'Suvendu', replies: 20, views: 390, recentReply: 'Sarah: Andrew Ng’s course is a great place to start!' },
        { id: 2, title: 'How to Approach Data Science Case Studies?', author: 'Eve', replies: 22, views: 480, recentReply: 'John: Structure your analysis properly and highlight insights.' },
        { id: 3, title: 'Interview Tips for Junior Data Scientists', author: 'Anna', replies: 14, views: 300, recentReply: 'Manas: Focus on practical ML skills and SQL.' },
        { id: 4, title: 'Deep Learning Interview Questions', author: 'Maya', replies: 19, views: 450, recentReply: 'Sam: Be prepared to discuss CNNs, RNNs, and LSTMs.' },
      ],
    },
    {
      role: 'Product Manager',
      threads: [
        { id: 1, title: 'How to Prepare for a Product Manager Interview?', author: 'Hari', replies: 30, views: 500, recentReply: 'Mike: Focus on the STAR method and customer-centric questions!' },
        { id: 2, title: 'Product Roadmap Case Studies for Interviews', author: 'Ryan', replies: 25, views: 450, recentReply: 'Jessica: Break it down into phases and milestones.' },
        { id: 3, title: 'What Metrics Should I Know for a PM Interview?', author: 'Lily', replies: 12, views: 350, recentReply: 'Tom: Be familiar with North Star metrics and KPIs!' },
        { id: 4, title: 'Tips for Answering Product Design Questions', author: 'Rob', replies: 20, views: 400, recentReply: 'James: Think in terms of customer pain points and solutions!' },
        { id: 5, title: 'Handling Conflict as a Product Manager', author: 'Sarah', replies: 15, views: 320, recentReply: 'Amy: Always align on shared goals and listen actively.' },
        { id: 6, title: 'Preparing for Stakeholder Management Questions', author: 'Alex', replies: 18, views: 380, recentReply: 'Nina: Show how you build relationships and trust.' },
      ],
    },
  ];

  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle expanded state for job role threads
  const toggleExpand = (role) => {
    setExpanded(prev => ({ ...prev, [role]: !prev[role] }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter threads based on search term
  const filteredJobRoles = jobRoles.map(role => ({
    ...role,
    threads: role.threads.filter(thread => thread.title.toLowerCase().includes(searchTerm.toLowerCase())),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-1 py-1 min-h-[10vh] text-center bg-white text-gray-900 shadow-md">
        <h1 className="text-5xl font-bold mb-4">Mock Vani Forum</h1>
        <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-600">
          Community conversations about Mock Vani.
        </p>

        <div className="bubble-container absolute inset-0 overflow-hidden"></div>

      </section>
      <div className="container mx-auto">
        {/* Forum Controls */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search the forum..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-3 mx-5 w-full md:w-1/2 rounded-lg"
          />
          <button className="bg-gray-800 text-gray-300 py-3 px-6 rounded-lg mt-4 ml-2">
            Post New Question
          </button>
        </div>

        {/* Job Role Discussions */}
        {filteredJobRoles.map(role => (
          <div key={role.role} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-600 mx-5 mb-4">{role.role} Discussions</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {role.threads.slice(0, expanded[role.role] ? role.threads.length : 3).map(thread => (
                <div key={thread.id} className="mb-4 p-4 border-b">
                  <h3 className="text-xl text-gray-900 font-semibold">{thread.title}</h3>
                  <p className="text-sm text-gray-600">by {thread.author} &middot; {thread.replies} replies &middot; {thread.views} views</p>
                  <p className="text-sm text-gray-500 italic">Last reply: {thread.recentReply}</p>
                </div>
              ))}
              {role.threads.length > 3 && (
                <button
                  className="text-blue-600 hover:underline mt-4"
                  onClick={() => toggleExpand(role.role)}
                >
                  {expanded[role.role] ? 'Show Less' : 'See More'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
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

export default Forum;
