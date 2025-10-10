'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import LazyFooter from '@/components/Footer/LazyFooter';

export default function LandingPage() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div
        data-label="LandingPage"
        className="bg-gray-950 text-white flex flex-col items-center justify-center px-6 h-screen gap-4"
      >
        {/* Hero Section */}
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Track GitHub Repos You Care About
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Stay on top of your favorite repositories with real-time insights,
            contributor stats, and commit trends — all in one place.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: 'Real-Time Analytics',
              desc: 'Monitor stars, forks, issues, and pull requests as they happen.',
              icon: '📊',
            },
            {
              title: 'Contributor Insights',
              desc: 'See who’s driving the code and how contributions evolve.',
              icon: '👥',
            },
            {
              title: 'Commit Trends',
              desc: 'Visualize activity over time to spot patterns and bursts.',
              icon: '📈',
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <p className="text-gray-500">Ready to explore your GitHub universe?</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            signIn();
            setIsLoading(true);
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading…' : 'Get Started with GitHub'}
        </button>
      </div>
      <LazyFooter />
    </>
  );
}
