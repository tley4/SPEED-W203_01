"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../css/auth.css'; // Adjust the path based on your file structure

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Use the environment variable for API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const loginEndPoint = `${apiUrl}api/login`; // Use the environment variable in the API call
  const signUpEndPoint = `${apiUrl}api/signup`; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
  
    const endpoint = isLogin ? loginEndPoint : signUpEndPoint; // Use the correct endpoint based on action
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (res.ok) {
        // Assume the backend returns both token and role in the response body
        const { token, role } = await res.json();
        
        // Store the token in the cookies with a simple expiry
        document.cookie = `token=${token}; path=/; max-age=3600`; // Token valid for 1 hour
        document.cookie = `role=${role}; path=/; max-age=3600`; // Role cookie
  
        // Store loggedIn status and role in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', role);  // Store the role in localStorage too
  
        console.log("Role set after login:", role);
        
        router.push('/'); // Redirect after successful login/signup
      } else {
        const { message } = await res.json();
        setError(message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.log("API URL:", apiUrl);
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <div className="account-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
