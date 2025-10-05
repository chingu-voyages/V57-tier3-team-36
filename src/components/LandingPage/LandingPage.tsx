import { AuthButton } from '@/components/Sidebar/AuthButton';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Track GitHub Repos You Care About
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Stay on top of your favorite repositories with real-time insights,
          contributor stats, and commit trends — all in one place.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
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
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 text-center">
        <p className="text-gray-500 mb-4">
          Ready to explore your GitHub universe?
        </p>
        <div className="flex justify-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
