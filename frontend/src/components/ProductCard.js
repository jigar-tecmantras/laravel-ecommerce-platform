import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const ProductCard = ({ product }) => (
  <article className='product-card'>
    {product.badge && <span className='product-tag'>{product.badge}</span>}
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p className='muted'>{product.category}</p>
    <p className='price'>{formatCurrency(product.price)}</p>
    <button type='button'>Add to cart</button>
  </article>
);

export default ProductCard;
