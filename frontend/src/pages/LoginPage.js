import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(form);
      navigate('/');
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to log in. Please try again.';
      setError(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className='auth-page'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className='muted'>Securely access your shopping cart and admin tools.</p>
        {error && <p className='form-error'>{error}</p>}
        <label>
          <span>Email</span>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
            placeholder='you@domain.com'
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            required
            placeholder='Enter your password'
          />
        </label>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
