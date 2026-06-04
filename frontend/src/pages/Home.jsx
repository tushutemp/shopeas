import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Slider images data
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: 'Welcome to ShopEase',
      subtitle: 'Discover amazing products at unbeatable prices',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      discount: 'Up to 50% Off'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop',
      title: 'Summer Sale',
      subtitle: 'Get the best deals on summer collections',
      buttonText: 'Explore Deals',
      buttonLink: '/shop?category=Fashion',
      discount: '30% OFF'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop',
      title: 'Electronics Mega Sale',
      subtitle: 'Latest gadgets at amazing prices',
      buttonText: 'Shop Electronics',
      buttonLink: '/shop?category=Electronics',
      discount: 'Save ₹100+'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=400&fit=crop',
      title: 'Home Decor Special',
      subtitle: 'Transform your living space',
      buttonText: 'View Collection',
      buttonLink: '/shop?category=Home%20%26%20Kitchen',
      discount: 'Free Shipping'
    }
  ]

  const categories = [
    { id: 1, icon: '📱', title: 'Electronics', description: 'Gadgets, accessories, and smart home essentials', link: '/shop?category=Electronics' },
    { id: 2, icon: '�', title: 'Clothes', description: 'Everyday wear, casual outfits, and seasonal styles', link: '/shop?category=Clothes' },
    { id: 3, icon: '👜', title: 'Bags', description: 'Tote bags, backpacks, and travel essentials', link: '/shop?category=Bags' },
    { id: 4, icon: '📚', title: 'Books', description: 'Best sellers, novels, and learning materials', link: '/shop?category=Books' },
    { id: 5, icon: '🍱', title: 'Foods', description: 'Snacks, groceries, and pantry favourites', link: '/shop?category=Foods' },
    { id: 6, icon: '✏️', title: 'Stationaries', description: 'Notebooks, pens, and desk supplies', link: '/shop?category=Stationaries' },
    { id: 7, icon: '🏠', title: 'Home & Living', description: 'Decor, kitchenware, and comfort essentials', link: '/shop?category=Home%20%26%20Kitchen' },
    { id: 8, icon: '⚽', title: 'Sports', description: 'Activewear, gear, and outdoor favourites', link: '/shop?category=Sports' }
  ]

  const trendingProducts = [
    { id: 1, icon: '⌚', title: 'Smart Watch', price: '₹1,999', link: '/shop?category=Electronics' },
    { id: 2, icon: '👟', title: 'Running Shoes', price: '₹1,299', link: '/shop?category=Sports' },
    { id: 3, icon: '🪑', title: 'Lounge Chair', price: '₹3,499', link: '/shop?category=Home%20%26%20Kitchen' },
  ]

  const testimonials = [
    { id: 1, quote: 'Amazing service and fast delivery. The products arrived sooner than expected!', name: 'Priya', role: 'Happy Customer' },
    { id: 2, quote: 'Great prices and friendly support. I found everything I needed easily.', name: 'Rahul', role: 'Verified Buyer' },
    { id: 3, quote: 'The website is beautiful and the shopping experience is smooth.', name: 'Sneha', role: 'Repeat Shopper' }
  ]

  // Auto-play functionality
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000) // Change slide every 5 seconds
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    resetAutoPlay()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    resetAutoPlay()
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <div className="home">
      {/* Hero Slider Section */}
      <section className="hero-slider-section">
        <div className="slider-container">
          <div 
            className="slider-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="slide">
                <div 
                  className="slide-background"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="slide-overlay"></div>
                </div>
                <div className="slide-content">
                  {slide.discount && <div className="discount-badge">{slide.discount}</div>}
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <Link to={slide.buttonLink} className="slide-btn">
                    {slide.buttonText} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="slider-arrow prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="slider-arrow next" onClick={nextSlide}>
            ❯
          </button>

          {/* Dots/Indicators */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Pause/Play Button */}
          <button 
            className="play-pause-btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-preview">
            <div className="preview-card">
              <div className="preview-image">📱</div>
              <h3>Electronics</h3>
              <Link to="/shop?category=Electronics">Shop Now →</Link>
            </div>
            <div className="preview-card">
              <div className="preview-image">👕</div>
              <h3>Clothes</h3>
              <Link to="/shop?category=Clothes">Shop Now →</Link>
            </div>
            <div className="preview-card">
              <div className="preview-image">🏠</div>
              <h3>Home & Living</h3>
              <Link to="/shop?category=Home%20%26%20Kitchen">Shop Now →</Link>
            </div>
            <div className="preview-card">
              <div className="preview-image">⚽</div>
              <h3>Sports</h3>
              <Link to="/shop?category=Sports">Shop Now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Shop With Confidence</h2>
          <p className="section-description">Fast delivery, great value, and support you can trust for every order.</p>
          <div className="features-grid">
            <Link to="/shipping" className="feature-card feature-link">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over ₹50000</p>
            </Link>
            <Link to="/pricing" className="feature-card feature-link">
              <div className="feature-icon">💰</div>
              <h3>Competitive Prices</h3>
              <p>Quality products at affordable rates</p>
            </Link>
            <Link to="/delivery" className="feature-card feature-link">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Quick dispatch and reliable shipping</p>
            </Link>
            <Link to="/support" className="feature-card feature-link">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer service</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="category-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Shop by category and discover the products you love.</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.id} to={category.link} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-section">
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <p>Popular picks our customers are loving this week.</p>
          </div>
          <div className="trending-grid">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trend-card">
                <div className="trend-icon">{product.icon}</div>
                <h3>{product.title}</h3>
                <p className="trend-price">{product.price}</p>
                <Link to={product.link}>View Collection →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Customers Say</h2>
            <p>Real feedback from happy ShopEase shoppers.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="testimonial-quote">“{testimonial.quote}”</p>
                <div className="testimonial-author">
                  <span>{testimonial.name}</span>
                  <small>{testimonial.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home