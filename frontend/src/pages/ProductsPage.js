import React from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import { featuredProducts, categories } from '../data/mockData';

const ProductsPage = () => (
  <div className='page'>
    <section className='section'>
      <div className='section-heading'>
        <h2>Product catalog</h2>
        <p className='muted'>Connect this list to the /api/products endpoint for real data.</p>
      </div>
      <div className='page-grid'>
        <CategorySidebar categories={categories} />
        <div className='cards-grid'>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ProductsPage;
