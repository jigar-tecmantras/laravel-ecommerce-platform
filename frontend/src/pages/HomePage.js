import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';
import { fetchCategories, fetchProducts } from '../api/catalog';
import { categories as fallbackCategories, featuredProducts as fallbackProducts } from '../data/mockData';

const HomePage = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError('');

    Promise.all([fetchProducts({ per_page: 8 }), fetchCategories()])
      .then(([productsRes, categoriesRes]) => {
        if (!mounted) {
          return;
        }

        setProducts(productsRes.data?.data ?? fallbackProducts);
        setCategories(categoriesRes.data ?? fallbackCategories);
      })
      .catch(() => {
        if (mounted) {
          setError('Unable to load the latest catalog. Displaying cached highlights.');
          setProducts(fallbackProducts);
          setCategories(fallbackCategories);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
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
            {loading && <p className='muted'>Loading catalog…</p>}
            {error && <p className='form-error'>{error}</p>}
            <div className='cards-grid'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
