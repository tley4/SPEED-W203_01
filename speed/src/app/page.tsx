"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/home.css'; // Adjust the path based on your file structure

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by reading the flag from localStorage
    const loggedInStatus = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLogout = () => {
    // Remove the login status from localStorage
    localStorage.removeItem('loggedIn');
    router.push('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Homepage</h1>
        {isLoggedIn ? (
          <>
            <p>You are logged in!</p>
            <button className="home-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Please log in to access your account.</p>
        )}
      </div>
    </div>
  );
}
