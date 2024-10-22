"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/home.css'; // Adjust the path based on your file structure

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');  // Add state for user role
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');
  
    // If not logged in or no role, redirect to login page
    if (!loggedInStatus || !role) {
      router.push('/login');
      return;
    }
  
    setIsLoggedIn(loggedInStatus === 'true');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Remove the token and role from cookies and localStorage
    document.cookie = 'token=; path=/; max-age=0';  // Clear the token
    document.cookie = 'role=; path=/; max-age=0';   // Clear the role from cookies if you store it there

    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');  // Clear the role from localStorage

    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Homepage</h1>
        {isLoggedIn ? (
          <>
            <p>You are logged in!</p>
            <p>Your role: {userRole}</p> {/* Display user role */}
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
