import React from 'react';
import { cartItems } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';

const CartPreview = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='cart-preview'>
      <div>
        <p className='eyebrow'>Cart</p>
        <p>{cartItems.length} items</p>
      </div>
      <strong>{formatCurrency(subtotal)}</strong>
    </div>
  );
};

export default CartPreview;
