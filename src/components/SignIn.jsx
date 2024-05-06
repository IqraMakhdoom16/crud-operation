// SignIn.js

import React, { useState } from 'react';
import Student from './Student';
import './SignIn.scss';

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@123' && password === '12345') {
      setIsSignedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {isSignedIn ? (
        <Student />
      ) : (
        <div className="sign-in-container">
          <div className="sign-in-form">
            <div className="heading">CRUD OPERATIONS</div>
            <div className="form-container">
              <h2 className="title">SIGN IN</h2>
              {error && <p className="error-message">{error}</p>}
              <div className="info-message">
                Enter your credentials to access your account
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className="submit-button">SIGN IN</button>
              </form>
              <div className="forgot-password">
                Forgot your password? <a href="#">Reset Password</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
