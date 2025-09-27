'use client';

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <div className="w-full flex p-4 items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-teal-400">Merge</span>
            <span className="text-gray-100">Force</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
