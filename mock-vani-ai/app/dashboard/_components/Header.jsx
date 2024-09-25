"use client";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import logo from '/assets/logo.png';  // Update the path if needed

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={logo}
            width={40}
            height={40}
            alt="Mock-Vani Logo"
            className="mr-2"
          />
          <span className="font-bold text-xl text-white">Mock-Vani</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="/dashboard"
            className={`hover:text-secondary transition ${path === '/dashboard' ? 'text-secondary font-semibold' : 'text-white'
              }`}
          >
            Dashboard
          </a>
          <a
            href="/dashboard/forum"
            className={`hover:text-secondary transition ${path === '/dashboard/forum' ? 'text-secondary font-semibold' : 'text-white'
              }`}
          >
            Forum
          </a>
          <a
            href="/dashboard/faq"
            className={`hover:text-secondary transition ${path === '/dashboard/faq' ? 'text-secondary font-semibold' : 'text-white'
              }`}
          >
            FAQ
          </a>
          <a
            href="/dashboard/upgrade"
            className={`hover:text-secondary transition ${path === '/dashboard/upgrade' ? 'text-secondary font-semibold' : 'text-white'
              }`}
          >
            Upgrade
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center">
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
          <UserButton />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-primary text-white p-4">
          <a href="/dashboard" className="block py-2">Dashboard</a>
          <a href="/dashboard/forum" className="block py-2">Forum</a>
          <a href="/dashboard/upgrade" className="block py-2">Upgrade</a>
          <a href="/dashboard/faq" className="block py-2">FAQ</a>
        </nav>
      )}
    </header>
  );
}

export default Header;
