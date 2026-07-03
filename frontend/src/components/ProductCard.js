import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const imageUrl = product.image_url ?? product.image;
  const categoryLabel = product.category?.name ?? product.category;

  return (
    <article className='product-card'>
      {product.badge && <span className='product-tag'>{product.badge}</span>}
      {imageUrl && <img src={imageUrl} alt={product.name} />}
      <h3>{product.name}</h3>
      {categoryLabel && <p className='muted'>{categoryLabel}</p>}
      <p className='price'>{formatCurrency(product.price ?? product.unit_price ?? 0)}</p>
      <button type='button'>Add to cart</button>
    </article>
  );
};

export default ProductCard;
