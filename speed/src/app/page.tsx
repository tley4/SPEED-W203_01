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
    // Remove the token from cookies
    document.cookie = 'token=; path=/; max-age=0'; // Clear the token
  
    localStorage.removeItem('loggedIn');
    router.push('/login'); // Redirect to the login page
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
