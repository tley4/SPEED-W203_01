import Link from 'next/link';
import React from 'react';

const Testbar: React.FC = () => {
  return (
    <div className="flex justify-between p-4" style={{ fontFamily: 'Courier New, monospace' }}>
      
      <div className="bg-[#90EE90] p-8 text-black">
        <h1 className="text-3xl font-bold">SPEED Database</h1>
      </div>

      <div className="flex gap-6">
        <Link href="/dashboard">
          <div className="bg-gray-400 text-black w-32 h-10 flex items-center justify-center">
            Dashboard
          </div>
        </Link>
        <Link href="/articles_saved">
          <div className="bg-gray-400 text-black w-20 h-10 flex items-center justify-center">
            Saved
          </div>
        </Link>
        <Link href="/search">
          <div className="bg-gray-400 text-black w-20 h-10 flex items-center justify-center">
            Search
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Testbar;
