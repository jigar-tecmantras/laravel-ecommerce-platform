import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchCart } from '../api/catalog';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    fetchCart()
      .then((response) => {
        setCart(response.data);
      })
      .catch(() => {
        setError('Unable to load your cart.');
      })
      .finally(() => setLoading(false));
  }, [user]);

  const subtotal = formatCurrency(cart.subtotal || 0);

  return (
    <div className='page'>
      <section className='section'>
        <div className='section-heading'>
          <h2>Your cart</h2>
          <p className='muted'>Items reserved for {user?.first_name ?? 'you'}.</p>
        </div>
        {loading && <p className='muted'>Loading your cart…</p>}
        {error && <p className='form-error'>{error}</p>}
        <div className='cards-grid'>
          {cart.items.map((item) => (
            <article key={item.id} className='product-card'>
              <h3>{item.product?.name ?? 'Product removed'}</h3>
              <p>Qty: {item.quantity}</p>
              <p className='price'>{formatCurrency(item.price_at_add)}</p>
              <p className='muted'>Subtotal: {formatCurrency(item.quantity * (item.product?.price ?? item.price_at_add))}</p>
            </article>
          ))}
        </div>
        <p className='section-subtitle'>Subtotal: {subtotal}</p>
      </section>
    </div>
  );
};

export default CartPage;
