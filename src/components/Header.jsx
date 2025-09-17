import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const cart = useSelector(state => state.cart.items);
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">BloomCart Nursery</Link>
      </div>
      <nav className="header-right">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
          <span role="img" aria-label="cart">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
