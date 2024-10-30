'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../css/auth.css'; // Adjust the path based on your file structure

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEST_PUBLIC_API_URL;
  const loginEndPoint = `${apiUrl}api/login`;
  const signUpEndPoint = `${apiUrl}api/signup`;

  useEffect(() => {
    // Check if the user is already logged in on component mount
    const storedLoggedIn = sessionStorage.getItem('loggedIn');
    const storedRole = sessionStorage.getItem('role');
    if (storedLoggedIn === 'true' && storedRole) {
      setLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const endpoint = isLogin ? loginEndPoint : signUpEndPoint;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { token, role } = await res.json();

        // Store the token in cookies with a 1-hour expiry
        document.cookie = `token=${token}; path=/; max-age=3600`;
        document.cookie = `role=${role}; path=/; max-age=3600`;

        // Store loggedIn status and role in sessionStorage
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('role', role);

        // Update state to reflect login status and role
        setLoggedIn(true);
        setRole(role);
        
        console.log("Role set after login:", role);
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

  const handleLogout = () => {
    // Clear session storage and update state
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('role');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';

    setLoggedIn(false);
    setRole(null);
    router.push('/'); // Redirect to home or login page
  };

  return (
    <div className="auth-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, {role}</h2>
          <button onClick={handleLogout} className="auth-button">Logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
