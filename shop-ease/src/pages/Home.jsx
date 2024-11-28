import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import img1 from '../assets/1.png'; // Import the image
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import { BiCategory } from 'react-icons/bi';
import { BsFilter, BsGift, BsStarFill, BsStarHalf, BsEnvelope, BsArrowRight } from 'react-icons/bs';
import { useCart } from '../context/CartContext'; // Import useCart
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { addToCart } = useCart(); // Get addToCart from context
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [img1, img2, img3, img4];

  useEffect(() => {
    // Fetch products
    axios.get('https://fakestoreapi.com/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));

    // Fetch categories
    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Select the first 6 products as featured products
  const featuredProducts = products.slice(0, 6);

  // Filter products based on both search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToCategories = (event) => {
    event.preventDefault();
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Bruce Wayne",
      avatar: "https://i.pinimg.com/736x/54/f5/6b/54f56bacda758a3055e8b3ca375cbbbd.jpg",
      rating: 5,
      comment: "Great products and fast shipping! The quality exceeded my expectations. Will definitely shop here again.",
      position: "Verified Buyer",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Cersei Lannister",
      avatar: "https://i.pinimg.com/736x/59/ed/ab/59edabe6162d7ba1e26df3ab597f75ba.jpg",
      rating: 4.5,
      comment: "I love the variety of items available! The customer service was exceptional. Highly recommend this store.",
      position: "Regular Customer",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Tony Stark",
      avatar: "https://i.pinimg.com/736x/06/83/1b/06831b14ccdf72e48479fa22d4e74e13.jpg",
      rating: 5,
      comment: "Amazing experience shopping here. The website is easy to navigate and the delivery was super fast!",
      position: "New Customer",
      date: "3 days ago"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`star-${i}`} className="star-icon" />);
    }
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="star-half" className="star-icon" />);
    }
    return stars;
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div>
      <header className="header" id="header">
        <div className="header-content">
          <h1>Welcome to Maison Élite</h1>
          <p className="header-subtitle">Where Luxury Meets Elegance</p>
          <div className="header-cta">
            <button className="header-button" onClick={scrollToCategories}>Shop Now</button>
            <button className="header-button secondary" onClick={handleLearnMore}>Learn More</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <h2>Featured Products</h2>
        <p>Check out our latest arrivals and special offers!</p>
        <div className="hero-slider">
          <button className="slider-button prev" onClick={prevSlide}>❮</button>
          <div className="hero-image">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt={`Slide ${index + 1}`}
                className={index === currentSlide ? 'active' : ''}
              />
            ))}
          </div>
          <button className="slider-button next" onClick={nextSlide}>❯</button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-container">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="categories" id="categories">
        <div className="categories-header">
          <div className="categories-title">
            <BiCategory className="category-icon" />
            <h2>Shop by Categories</h2>
          </div>
          <div className="categories-filter">
            <BsFilter className="filter-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="category-list">
          <div 
            className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>

        <div className="category-results">
          <p className="results-count">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          <div className="product-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="promotional-banner">
        <div className="promo-content">
          <div className="promo-icon">
            <BsGift />
          </div>
          <div className="promo-text">
            <h2>Special Offer!</h2>
            <p>Get 20% off on your first purchase!</p>
          </div>
          <button className="promo-button">
            Claim Now
          </button>
        </div>
      </section>

      <section className="customer-reviews" id="feedback">
        <h2>What Our Customers Say</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                <div className="reviewer-info">
                  <h3>{review.name}</h3>
                  <span className="reviewer-position">{review.position}</span>
                </div>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-icon">
              <BsEnvelope />
            </div>
            <h2>Stay in the Loop!</h2>
            <p>Subscribe to get exclusive offers, latest trends, and insider news delivered straight to your inbox.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input" 
              />
              <button className="newsletter-button">
                Subscribe <BsArrowRight className="arrow-icon" />
              </button>
            </div>
            <div className="newsletter-benefits">
              <span>✓ Exclusive Offers</span>
              <span>✓ New Arrivals</span>
              <span>✓ Special Events</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Maison Élite</h4>
            <p>Your destination for luxury fashion and lifestyle, bringing curated elegance to your doorstep.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Maison Élite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

