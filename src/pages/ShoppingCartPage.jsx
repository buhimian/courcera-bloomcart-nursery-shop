import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../cartSlice';
import plantsArray from './plantData';
import './ShoppingCartPage.css';
import { Link } from 'react-router-dom';

const getPlantByName = (name) => {
  for (const category of plantsArray) {
    const found = category.plants.find(plant => plant.name === name);
    if (found) return found;
  }
  return null;
};

const ShoppingCartPage = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const cartItems = Object.values(cart);

  const total = cartItems.reduce((sum, item) => {
    const plant = getPlantByName(item.name);
    let cost = 0;
    if (plant && typeof plant.cost === 'string') {
      cost = Number(plant.cost.replace(/[^\d.]/g, ''));
    } else if (plant) {
      cost = plant.cost;
    }
    return sum + (cost * item.quantity);
  }, 0);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-summary">
        <span>Items: {cartItems.length}</span>
        <span>Total: ${total}</span>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => {
            const plant = getPlantByName(item.name);
            if (!plant) return null;
            return (
              <div key={item.name} className="cart-item">
                <img src={plant.image} alt={plant.name} className="cart-item-img" />
                <div className="cart-item-info" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h4>{plant.name}</h4>
                      <p>{plant.description}</p>
                      <p className="cart-cost">{plant.cost}</p>
                      <div className="cart-qty-controls" style={{ justifyContent: 'center' }}>
                        <button onClick={() => {
                          if (item.quantity === 1) {
                            dispatch(removeFromCart(item.name));
                          } else {
                            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
                          }
                        }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => dispatch(removeFromCart(item.name))}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="cart-actions">
        <Link to="/products" className="continue-btn">Continue Shopping</Link>
        <button className="checkout-btn" onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
