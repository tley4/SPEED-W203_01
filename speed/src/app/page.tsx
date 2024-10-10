"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Homepage</h1>
      {isLoggedIn && <p>You are logged in!</p>}
      {!isLoggedIn && <p>Please log in to access your account.</p>}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}