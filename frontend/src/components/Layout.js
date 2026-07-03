import React from 'react';
import { NavLink } from 'react-router-dom';
import CartPreview from './CartPreview';

const menu = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Admin', path: '/admin' },
];

const Layout = ({ children }) => (
  <div className='app-shell'>
    <header className='app-header'>
      <div className='brand'>Ecom Stack</div>
      <nav className='nav-links'>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
    <main className='app-main'>{children}</main>
    <CartPreview />
  </div>
);

export default Layout;
