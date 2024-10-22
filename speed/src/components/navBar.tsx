import React from 'react';
import Link from 'next/link';
import '../css/navBar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="bg-light-green text-2xl w-30 h-20 flex items-center justify-center">
          SPEED
        </a>
      </div>

      <div className="flex gap-6">
  
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
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
