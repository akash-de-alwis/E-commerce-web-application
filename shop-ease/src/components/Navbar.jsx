import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsSearch, BsStarFill, BsCart3 } from 'react-icons/bs';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemCount = 3;

  const handleHomeClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'categories' } });
    } else {
      const element = document.getElementById('categories');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFeedbackClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'feedback' } });
    } else {
      const element = document.getElementById('feedback');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span>Maison Élite</span>
      </div>
      
      <div className="nav-links">
        <a href="/" onClick={handleHomeClick}>
          <AiOutlineHome className="nav-icon" />
          <span>Home</span>
        </a>
        <a href="#categories" onClick={handleCategoryClick}>
          <BiCategoryAlt className="nav-icon" />
          <span>Categories</span>
        </a>
        <a href="#feedback" onClick={handleFeedbackClick}>
          <BsStarFill className="nav-icon" />
          <span>Feedback</span>
        </a>
        <button className="cart-button" onClick={handleCartClick}>
          <div className="cart-icon-container">
            <BsCart3 className="nav-icon" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
          <span className="cart-text">Cart</span>
        </button>
        <div className="nav-search">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
