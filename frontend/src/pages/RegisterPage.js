import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await register(form);
      navigate('/');
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to register. Please try again.';
      setError(Array.isArray(message) ? message[0] : message);
    }
  };

  return (
    <div className='auth-page'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <p className='muted'>Setup your login and receive access to the storefront.</p>
        {error && <p className='form-error'>{error}</p>}
        <label>
          <span>First name</span>
          <input name='first_name' value={form.first_name} onChange={handleChange} required />
        </label>
        <label>
          <span>Last name</span>
          <input name='last_name' value={form.last_name} onChange={handleChange} />
        </label>
        <label>
          <span>Email</span>
          <input type='email' name='email' value={form.email} onChange={handleChange} required />
        </label>
        <label>
          <span>Password</span>
          <input type='password' name='password' value={form.password} onChange={handleChange} required />
        </label>
        <label>
          <span>Confirm password</span>
          <input
            type='password'
            name='password_confirmation'
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit' disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
