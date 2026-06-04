import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories as defaultCategories } from '../data/products'
import './Shop.css'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState(['all'])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products')
      if (response.data?.success) {
        const fetchedProducts = response.data.data.map(product => ({
          ...product,
          id: product.id || product._id,
        }))
        setProducts(fetchedProducts)

        const staticCategories = defaultCategories.filter(category => category !== 'all')
        const fetchedCategories = Array.from(new Set(fetchedProducts.map(product => product.category).filter(Boolean)))

        setCategories([
          'all',
          ...Array.from(new Set([...staticCategories, ...fetchedCategories]))
        ])
      } else {
        console.error('Failed to load products:', response.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price))
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => Number(b.rating) - Number(a.rating))
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchParams({ category })
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <div className="container">
          <h1 className="shop-title">Our Products</h1>
          
          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="shop-content">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Category</h3>
              <div className="category-dropdown-wrapper">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="category-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Sort By</h3>
              <div className="sort-dropdown-wrapper">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: Highest First</option>
                </select>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="products-section">
            <div className="products-header">
              <p className="products-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))
              ) : (
                <div className="no-products">
                  <p>No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Shop