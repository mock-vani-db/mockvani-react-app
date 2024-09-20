import React from 'react';
import Header from './_components/Header';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow mx-5 md:mx-20 lg:mx-36 py-8 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-center py-4 text-white mt-10">
        <p>&copy; {new Date().getFullYear()} Mock-Vani. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DashboardLayout;
