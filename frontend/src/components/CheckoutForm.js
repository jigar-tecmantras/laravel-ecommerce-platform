import React, { useState } from 'react';

const CheckoutForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Checkout integration needs to be wired to the Laravel API.');
  };

  return (
    <form className='checkout-form' onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input name='name' value={form.name} placeholder='Full name' onChange={handleChange} required />
      <input
        name='email'
        type='email'
        value={form.email}
        placeholder='Email address'
        onChange={handleChange}
        required
      />
      <input name='address' value={form.address} placeholder='Shipping address' onChange={handleChange} required />
      <textarea
        name='notes'
        value={form.notes}
        placeholder='Order notes'
        rows='3'
        onChange={handleChange}
      />
      <button type='submit'>Submit order</button>
    </form>
  );
};

export default CheckoutForm;
