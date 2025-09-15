'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  github: string;
  linkedin?: string;
  role: 'Developers' | 'UI/UX Designer' | 'Scrum Master' | 'Product Owner';
  gender: 'male' | 'female';
  imageName: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Kelly Ripple', github: 'https://github.com/kripple', linkedin: 'https://www.linkedin.com/in/kellymripple/', role: 'Developers', gender: 'female', imageName: 'Kelly.jpg' },
  { name: 'Vincent Bui', github: 'https://github.com/VincentBui0', linkedin: 'https://www.linkedin.com/in/vincent-bui0', role: 'Developers', gender: 'male', imageName: 'vincent.jpg' },
  { name: 'David Eastmond', github: 'https://github.com/davideastmond', linkedin: 'https://www.linkedin.com/in/david-eastmond-2783ab18a/', role: 'Developers', gender: 'male', imageName: 'David.jpg' },
  { name: 'Peter Tasca', github: 'https://github.com/tascapeter514', linkedin: 'https://www.linkedin.com/in/peter-tasca/', role: 'Developers', gender: 'male', imageName: 'Peter.jpg' },
  { name: 'Hyun Woo Kim', github: 'https://github.com/hynwkm', linkedin: 'https://www.linkedin.com/in/hyunwoo-kim/', role: 'Developers', gender: 'male', imageName: 'Hyun.jpg' },
  { name: 'Sattyik Kundu', github: 'https://github.com/SattyikKundu', role: 'Developers', gender: 'male', imageName: 'Sattyik.jpeg' },
];

const availableColors = [
  '#07BEB8', // Teal
  '#FF6B6B', // Red/Orange
  '#00CED1', // Dark Turquoise
  '#4169E1', // Royal Blue
  '#FF8E53', // Orange
  '#32CD32', // Lime Green
  '#FF1493', // Deep Pink
  '#228B22', // Forest Green
  '#8B4513', // Saddle Brown
  '#9B59B6', // Purple
  '#1E90FF', // Dodger Blue
  '#E74C3C', // Red
  '#2ECC71', // Green
  '#FF4500', // Orange Red
  '#20B2AA', // Light Sea Green
  '#8A2BE2', // Blue Violet
  '#DC143C', // Crimson
  '#00FA9A', // Medium Spring Green
  '#FF6347', // Tomato
  '#9370DB', // Medium Purple
  '#3CB371', // Medium Sea Green
  '#FF69B4', // Hot Pink
  '#4682B4', // Steel Blue
  '#9932CC', // Dark Orchid
  '#B8860B', // Dark Goldenrod
  '#006400', // Dark Green
  '#191970', // Midnight Blue
  '#8B008B', // Dark Magenta
  '#B22222', // Fire Brick
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// GitHub SVG Icon Component
const GitHubIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function Footer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { groupedMembers, roleColors } = useMemo(() => {
    const grouped = teamMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {} as Record<string, TeamMember[]>);

    const shuffledEntries = shuffleArray(Object.entries(grouped));
    const shuffledGrouped = Object.fromEntries(shuffledEntries);

    const shuffledColors = shuffleArray(availableColors);
    const roleColors: Record<string, string> = {};

    Object.keys(shuffledGrouped).forEach((role, index) => {
      roleColors[role] = shuffledColors[index % shuffledColors.length];
    });

    return { groupedMembers: shuffledGrouped, roleColors };
  }, [drawerOpen]);

  return (
    <>
      <footer className="bg-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* GitHub Logo on Left */}
          <a
            href="https://github.com/chingu-voyages/V56-tier3-team-37"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-colors cursor-pointer"
          >
            <GitHubIcon className="w-7 h-7" />
          </a>

          {/* Credits Label on Right */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-white hover:text-gray-200 font-medium cursor-pointer hover:scale-105 transform transition-transform"
          >
            Credits
          </button>
        </div>
      </footer>

      {/* Credits Drawer/Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-h-[70vh] bg-white rounded-t-2xl shadow-2xl border border-gray-100 animate-slide-up">
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                  Team Credits
                </h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all hover:scale-105"
                >
                  <span className="text-gray-600 font-semibold text-xl">×</span>
                </button>
              </div>

              {/* Team Members by Role */}
              <div className="space-y-6">
                {Object.entries(groupedMembers).map(([role, members], roleIndex) => (
                  <div key={role}>
                    {/* Role Header */}
                    <div className="mb-4">
                      <span
                        className="inline-block px-4 py-2 text-white font-semibold text-sm rounded-2xl shadow-sm"
                        style={{ backgroundColor: roleColors[role] }}
                      >
                        {role}
                      </span>
                    </div>

                    {/* Members in this role */}
                    <div className="space-y-3">
                      {members.map((member) => (
                        <div
                          key={member.name}
                          className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-gray-200 hover:bg-slate-100 hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 sm:gap-6">
                            {/* Profile Image */}
                            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-3 border-white shadow-lg hover:scale-105 transition-transform">
                              <Image
                                src={`/images/${member.imageName}`}
                                alt={`${member.name} profile picture`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 600px) 64px, 72px"
                              />
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                                {member.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3">
                                <a
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                  <GitHubIcon className="w-4 h-4" />
                                  GitHub
                                </a>
                                {member.linkedin && (
                                  <>
                                    <span className="text-gray-400 font-medium">/</span>
                                    <a
                                      href={member.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                      LinkedIn
                                    </a>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Divider between roles (except after last role) */}
                    {roleIndex < Object.keys(groupedMembers).length - 1 && (
                      <div className="my-6 border-t border-gray-200 opacity-50" />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-6 pt-6 border-t border-gray-200 bg-slate-50 rounded-2xl p-6">
                <p className="text-gray-600 text-center italic font-medium text-base">
                  (Insert text here)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}