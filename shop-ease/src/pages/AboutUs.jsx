import { FaShippingFast, FaUserShield, FaHeadset, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Fast Delivery',
      description: 'Get your products delivered at your doorstep within 24-48 hours'
    },
    {
      icon: <FaUserShield />,
      title: 'Secure Shopping',
      description: 'Your security is our top priority with encrypted transactions'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Our customer service team is available round the clock'
    },
    {
      icon: <FaMedal />,
      title: 'Quality Products',
      description: 'All our products go through strict quality control measures'
    }
  ];

  const journeyMilestones = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Maison Élite was founded with a vision to simplify online shopping'
    },
    {
      year: '2019',
      title: 'Going Mobile',
      description: 'Launched our mobile app, reaching 100K+ downloads in first month'
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Extended operations to 50+ countries worldwide'
    },
    {
      year: '2023',
      title: 'Innovation Award',
      description: 'Recognized as the Most Innovative E-commerce Platform'
    }
  ];

  return (
    <div className="about-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About ShopEase</h1>
        <p>Your Trusted Shopping Destination</p>
      </motion.div>

      <section className="mission-section">
        <div className="container">
          <motion.div 
            className="mission-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Our Mission</h2>
            <p>
              At ShopEase, we're committed to revolutionizing your shopping experience. 
              Our mission is to provide high-quality products at competitive prices while 
              ensuring exceptional customer service.
            </p>
          </motion.div>
          <div className="stats-container">
            <div className="stat-item">
              <h3>1M+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Countries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            {journeyMilestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className="timeline-item"
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-content">
                  <div className="year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Email: info@shopease.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Commerce Street, Shopping District, NY 10001</p>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 