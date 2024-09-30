"use client";

import { useState } from 'react';

const LoginForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the login logic here, like sending a request to your backend
        console.log('Username:', username, 'Password:', password);
        // Implement login functionality here
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Login'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;