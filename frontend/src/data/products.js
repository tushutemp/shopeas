export const products = []

// Export categories array
export const categories = ['all', 'Electronics', 'Accessories', 'Clothes', 'Bags', 'Books', 'Stationaries', 'Home & Kitchen', 'Sports']

// Export helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(product => product.category === category)
}

// Default export
export default products