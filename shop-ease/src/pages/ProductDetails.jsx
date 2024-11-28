import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Item added to cart successfully!');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details" style={{ padding: '20px' }}>
      <img src={product.image} alt={product.title} style={{ borderRadius: '8px', width: '300px' }} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
