import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';
import { featuredProducts, categories } from '../data/mockData';

const HomePage = () => (
  <div className='page home-page'>
    <HeroBanner />
    <section className='section'>
      <div className='page-grid'>
        <CategorySidebar categories={categories} />
        <div>
          <div className='section-heading'>
            <h2>Featured products</h2>
            <p className='muted'>Fresh arrivals aligned with your catalog strategy.</p>
          </div>
          <div className='cards-grid'>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
