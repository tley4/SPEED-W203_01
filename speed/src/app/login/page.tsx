"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Update the endpoint to match your backend server's URL and port
    const endpoint = isLogin
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Store a flag in local storage indicating that the user is logged in
        localStorage.setItem('loggedIn', 'true');
        router.push('/'); // Redirect after successful login/signup
      } else {
        const { message } = await res.json();
        setError(message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p style={{ marginTop: '10px' }}>
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: 'blue', cursor: 'pointer' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}