import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../cartSlice';
import plantsArray from './plantData';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="product-listing">
      <h2>Shop Houseplants</h2>
      {plantsArray.map(categoryObj => (
        <div key={categoryObj.category} className="category-section">
          <h3>{categoryObj.category}</h3>
          <div className="plant-grid">
            {categoryObj.plants.map(plant => {
              const inCart = cart[plant.name];
              return (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-img" />
                  <div className="plant-info">
                    <h4>{plant.name}</h4>
                    <p>{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    {inCart && inCart.quantity > 0 ? (
                      <div className="cart-qty-controls">
                        <button onClick={() => {
                          if (inCart.quantity === 1) {
                            dispatch(removeFromCart(plant.name));
                          } else {
                            dispatch(updateQuantity({ name: plant.name, quantity: inCart.quantity - 1 }));
                          }
                        }}>-</button>
                        <span>{inCart.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ name: plant.name, quantity: inCart.quantity + 1 }))}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => dispatch(addToCart(plant))} className="add-cart-btn">Add to Cart</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListingPage;
