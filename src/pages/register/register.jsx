import axios from 'axios';
import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  //http://localhost:8000/user/AddUser

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('http://localhost:8000/user/AddUser', {
        name: userName,
        email: email,
        password: password,
      });
      console.log(res.data);
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username ...."
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email ...."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your password ...."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          something went wrong !!!
        </span>
      )}
    </div>
  );
}
