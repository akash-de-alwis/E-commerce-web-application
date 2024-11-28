import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const [cart, setCart] = useState(cartItems);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    toast.info('Item removed from cart');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }
    if (newQuantity > 10) {
      toast.error('Maximum quantity limit reached');
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
    toast.success('Quantity updated');
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    // Add your checkout logic here
  };

  const handleContinueShopping = () => {
    navigate('/');
    toast.info('Continuing to shop...');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = item.quantity || 1;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        
        {cart.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
