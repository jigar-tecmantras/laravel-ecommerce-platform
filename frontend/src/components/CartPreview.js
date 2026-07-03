import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../api/catalog';
import { formatCurrency } from '../utils/formatCurrency';
import useAuth from '../hooks/useAuth';

const CartPreview = () => {
  const { isAuthenticated } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    if (!isAuthenticated) {
      setSummary(null);
      setError('Sign in to view your cart.');
      return () => {
        isMounted = false;
      };
    }

    setLoading(true);
    setError('');

    fetchCart()
      .then((response) => {
        if (!isMounted) {
          return;
        }
        setSummary(response.data);
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to refresh cart.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const subtotal = summary?.subtotal ?? 0;
  const count = summary?.items?.length ?? 0;

  return (
    <div className='cart-preview'>
      <div>
        <p className='eyebrow'>Cart</p>
        <p>{isAuthenticated ? `${count} item${count === 1 ? '' : 's'}` : 'Sign in to view'}</p>
        {error && <p className='form-error'>{error}</p>}
      </div>
      <div className='cart-preview-actions'>
        <strong>{formatCurrency(subtotal)}</strong>
        <Link to='/cart'>Review</Link>
      </div>
      {loading && <p className='muted'>Refreshing…</p>}
    </div>
  );
};

export default CartPreview;
