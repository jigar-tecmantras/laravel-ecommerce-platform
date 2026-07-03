import React, { useEffect, useState } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import { fetchCategories, fetchProducts } from '../api/catalog';
import useAuth from '../hooks/useAuth';

const ProductsPage = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = (categoryId = '') => {
    setLoading(true);
    setError('');

    fetchProducts({ category_id: categoryId, per_page: 24 })
      .then((response) => setProducts(response.data?.data ?? []))
      .catch(() => setError('Unable to load products right now.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories()
      .then((response) => setCategories(response.data))
      .catch(() => setError('Unable to load categories.'));

    loadProducts();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    loadProducts(categoryId);
  };

  return (
    <div className='page'>
      <section className='section'>
        <div className='section-heading'>
          <h2>Product catalog</h2>
          <p className='muted'>Powered by the Laravel products endpoint.</p>
        </div>
        <div className='page-grid'>
          <aside className='category-sidebar'>
            <h3>Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type='button'
                    className={category.id === selectedCategory ? 'active' : ''}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            {isAuthenticated && <p className='muted'>Cart + checkout require authentication.</p>}
          </aside>
          <div>
            {loading && <p className='muted'>Loading products…</p>}
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

export default ProductsPage;
