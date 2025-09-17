import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LandingPage from './pages/LandingPage';
import ProductListingPage from './pages/ProductListingPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courcera-bloomcart-nursery-shop" element={<LandingPage />} />
          <Route path="/products" element={<><Header /><ProductListingPage /></>} />
          <Route path="/cart" element={<><Header /><ShoppingCartPage /></>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
