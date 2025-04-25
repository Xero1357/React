import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    setForm({ ...form, [key]: e.target.value });
  };

  const handleLoginOrCreate = () => {
    if (form.email && form.password) {
      const name = form.username || 'John';
      localStorage.setItem('username', name);
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="form-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="align-end" type="button" onClick={handleLoginOrCreate}>
          Create Account
        </button>
      </div>
      <div className="form-container">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="align-end" type="button" onClick={handleLoginOrCreate}>
          Login
        </button>
      </div>
    </>
  );
};

export default AuthForm;
