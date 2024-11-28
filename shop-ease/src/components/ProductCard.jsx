import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const shortTitle = product.title.length > 30 
    ? product.title.substring(0, 30) + '...' 
    : product.title;

  const shortDescription = product.description.length > 50 
    ? product.description.substring(0, 50) + '...' 
    : product.description;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Item added to cart successfully!');
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{shortTitle}</h3>
      <p className="product-description">{shortDescription}</p>
      <p className="product-price">${product.price}</p>
      <button className="button add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
  