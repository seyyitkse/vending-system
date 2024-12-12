// src/pages/LoginUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginUser.css'; // Add appropriate CSS for styling

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('https://localhost:44395/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save JWT to local storage
        const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decode the JWT
        const userRole = decodedToken.role; // Extract role from token

        if (userRole === 'Admin') {
          navigate('/admin-dashboard'); // Redirect admin to admin dashboard
        } else {
          navigate('/user-dashboard'); // Redirect regular user to user dashboard
        }
      } else {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginUser;
