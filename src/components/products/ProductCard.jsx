import { Plus, ArrowUpRight, Flame, MessageCircle } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { getProductNutrition } from '../../services/nutritionService'

export default function ProductCard({ product, onAdd, onDetails, onReview }) {
  const nutrition = getProductNutrition(product.id)

  return (
    <article className="product-card">
      <button
        className="product-image"
        onClick={() => onDetails(product)}
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <span className="image-arrow"><ArrowUpRight size={17} /></span>
      </button>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.size}</span>
        </div>
        <button className="product-title" onClick={() => onDetails(product)}>
          {product.name}
        </button>
        <p>{product.description}</p>

        <div className="nutrition-mini">
          <span><Flame size={14} /> {nutrition?.kcal ?? '—'} kcal</span>
          <span>{nutrition?.protein ?? '—'}g protein</span>
        </div>

        <div className="product-buy">
          <strong>{formatCurrency(product.price)}</strong>
          <button className="add-btn" onClick={() => onAdd(product)}>
            <Plus size={17} /> Add
          </button>
        </div>

        <button
          className="review-btn"
          onClick={() => onReview?.(product)}
          type="button"
        >
          <MessageCircle size={15} /> Read / write reviews
          <span>→</span>
        </button>
      </div>
    </article>
  )
}
