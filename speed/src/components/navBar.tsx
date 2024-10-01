import React from 'react';
import Link from 'next/link';
import '../css/navBar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100" style={{ fontFamily: 'Courier New, monospace' }}>
      <div className="flex-1">
        <a className="bg-[#C7F6C7] text-6xl w-60 h-35 flex items-center justify-center">
          SPEED
        </a>
      </div>

      <div className="flex gap-6">
        <ul className="flex gap-6 menu menu-horizontal px-1">
          <li>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/articles_saved">
              Saved
            </Link>
          </li>
          <li>
            <Link href="/search">
              Search
            </Link>
          </li>
          <li>
            <details>
              <summary className="nav-link">Article</summary>
              <ul className="dropdown-content">
                <li>
                  <Link href="/submission">
                    Submit
                  </Link>
                </li>
                <li>
                  <Link href="/moderate_article">
                    Moderate
                  </Link>
                </li>
                <li>
                  <Link href="/analyse_article">
                    Analyse
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
