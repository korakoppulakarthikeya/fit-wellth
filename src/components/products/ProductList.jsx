import ProductCard from './ProductCard'

export default function ProductList({ products, onAdd, onDetails, onReview }) {
  if (!products.length) {
    return <div className="empty-state">No items found. Try another category or search term.</div>
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onDetails={onDetails}
          onReview={onReview}
        />
      ))}
    </div>
  )
}
