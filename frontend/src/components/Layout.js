import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartPreview from './CartPreview';
import useAuth from '../hooks/useAuth';

const menu = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Admin', path: '/admin' },
];

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <div className='app-shell'>
      <header className='app-header'>
        <Link to='/' className='brand'>
          Ecom Stack
        </Link>
        <nav className='nav-links'>
          {menu.map((item) => (
            <NavLink key={item.name} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className='header-actions'>
          {isAuthenticated ? (
            <>
              <span className='user-chip'>Welcome, {user?.first_name ?? 'customer'}</span>
              <button type='button' className='ghost' onClick={logout} disabled={loading}>
                {loading ? 'Signing out…' : 'Sign out'}
              </button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </div>
      </header>
      <main className='app-main'>{children}</main>
      <CartPreview />
    </div>
  );
};

export default Layout;
