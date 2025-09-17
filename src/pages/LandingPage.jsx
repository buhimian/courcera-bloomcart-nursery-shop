import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-bg">
      <div className="landing-content">
        <h1>BloomCart Nursery</h1>
        <p>Welcome to BloomCart Nursery! We offer a curated selection of beautiful houseplants to brighten your home and purify your air. Discover our collection and bring nature indoors.</p>
        <button className="get-started" onClick={() => navigate('/products')}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
