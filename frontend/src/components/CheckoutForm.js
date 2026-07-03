import React, { useState } from 'react';
import { checkoutCart } from '../api/catalog';
import useAuth from '../hooks/useAuth';

const CheckoutForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.full_name ?? '',
    email: user?.email ?? '',
    address: '',
    notes: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      await checkoutCart({
        name: form.name,
        email: form.email,
        address: form.address,
        notes: form.notes,
      });
      setStatus('Order placed. You will receive an email confirmation shortly.');
    } catch (err) {
      setStatus(err?.response?.data?.message || 'Checkout failed. Please review your cart.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='checkout-form' onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p className='muted'>Orders are processed securely through the REST API.</p>
      {status && <p className='form-info'>{status}</p>}
      <input name='name' value={form.name} placeholder='Full name' onChange={handleChange} required />
      <input name='email' type='email' value={form.email} placeholder='Email address' onChange={handleChange} required />
      <input name='address' value={form.address} placeholder='Shipping address' onChange={handleChange} required />
      <textarea name='notes' value={form.notes} placeholder='Order notes' rows='3' onChange={handleChange} />
      <button type='submit' disabled={loading}>
        {loading ? 'Placing order…' : 'Submit order'}
      </button>
    </form>
  );
};

export default CheckoutForm;
