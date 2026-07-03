import React from 'react';
import { cartItems } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='page'>
      <section className='section'>
        <div className='section-heading'>
          <h2>Your cart</h2>
          <p className='muted'>Review items before checkout.</p>
        </div>
        <div className='cards-grid'>
          {cartItems.map((item) => (
            <article key={item.id} className='product-card'>
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <p className='price'>{formatCurrency(item.price)}</p>
            </article>
          ))}
        </div>
        <p className='muted'>Subtotal: {formatCurrency(subtotal)}</p>
      </section>
    </div>
  );
};

export default CartPage;
