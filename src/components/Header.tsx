'use client';

import { useState, useEffect } from 'react';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDate();
    // Update date every minute to keep it current
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', href: '#', placeholder: true },
    { name: 'Surgery Tracker', href: '#', placeholder: true },
    { name: 'Team Management', href: '#', placeholder: true },
    { name: 'Reports', href: '#', placeholder: true },
    { name: 'Settings', href: '#', placeholder: true }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                <span className="text-teal-600">Merge</span>
                <span className="text-gray-800">Force</span>
              </h1>
            </div>
          </div>

          {/* Current Date - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700">
                {currentDate}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.placeholder
                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                }`}
                onClick={item.placeholder ? (e) => e.preventDefault() : undefined}
              >
                {item.placeholder ? 'TBA' : item.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 mb-4 border border-gray-200">
            {/* Current Date for Mobile */}
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-gray-700 text-center bg-white rounded-md py-2 border border-gray-200">
                {currentDate}
              </p>
            </div>
            
            {/* Mobile Navigation Items */}
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.placeholder
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-white'
                }`}
                onClick={item.placeholder ? (e) => e.preventDefault() : undefined}
              >
                {item.placeholder ? 'TBA' : item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;