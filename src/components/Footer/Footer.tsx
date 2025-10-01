'use client';

import Image from 'next/image';
import GitHubIcon from '@/icons/GitHubIcon';

interface TeamMember {
  name: string;
  github: string;
  linkedin?: string;
  imageName?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Kelly Ripple',
    github: 'https://github.com/kripple',
    linkedin: 'https://www.linkedin.com/in/kellymripple/',
    imageName: 'Kelly.jpg',
  },
  {
    name: 'Vincent Bui',
    github: 'https://github.com/VincentBui0',
    linkedin: 'https://www.linkedin.com/in/vincent-bui0',
    imageName: 'Vincent.jpg',
  },
  {
    name: 'David Eastmond',
    github: 'https://github.com/davideastmond',
    linkedin: 'https://www.linkedin.com/in/david-eastmond-2783ab18a/',
    imageName: 'David.jpg',
  },
  {
    name: 'Peter Tasca',
    github: 'https://github.com/tascapeter514',
    linkedin: 'https://www.linkedin.com/in/peter-tasca/',
    imageName: 'Peter.jpg',
  },
  {
    name: 'Hyun Woo Kim',
    github: 'https://github.com/hynwkm',
    linkedin: 'https://www.linkedin.com/in/hyunwoo-kim/',
    imageName: 'Hyun.jpg',
  },
  { name: 'Sattyik Kundu', github: 'https://github.com/SattyikKundu' },
];

// Default avatar component for members without images
const DefaultAvatar = ({ name }: { name: string }) => (
  <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-lg">
    {name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-300">
          <h2 className="text-2xl font-bold text-base-content">Team Credits</h2>
          <a
            href="https://github.com/chingu-voyages/V56-tier3-team-37"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content hover:text-primary transition-colors"
          >
            <GitHubIcon className="w-7 h-7" />
          </a>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {teamMembers.map(member => (
            <div
              key={member.name}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center gap-4">
                {/* Profile Image or Default Avatar */}
                <div className="flex-shrink-0">
                  {member.imageName ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={`/images/${member.imageName}`}
                        alt={`${member.name} profile picture`}
                        fill
                        className="object-cover"
                        sizes="64px"
                        onError={e => {
                          // Hide the image and show default avatar on error
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <DefaultAvatar name={member.name} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base-content text-lg leading-tight mb-2">
                    {member.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm gap-1"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center pt-6 border-t border-base-300">
          <p className="text-base-content/70 italic">
            Built by the MergeForce team
          </p>
        </div>
      </div>
    </footer>
  );
}
