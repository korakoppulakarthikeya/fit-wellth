import { useEffect, useState } from 'react'
import { X, MessageSquareText, Star } from 'lucide-react'
import { supabase } from '../../services/supabase'
import ReviewForm from './ReviewForm'
import ReviewCard from './ReviewCard'

export default function ProductReviews({ product, onClose }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    async function fetchReviews() {
      setLoading(true)
      setError('')

      if (!supabase) {
        setError('Reviews are temporarily unavailable. Please try again later.')
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('reviews')
        .select('id, product_id, name, rating, comment, created_at')
        .eq('product_id', product.id)
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (!active) return

      if (queryError) {
        console.error('Could not load product reviews:', queryError)
        setError('Could not load reviews. Please try again.')
      } else {
        setReviews(data || [])
      }
      setLoading(false)
    }

    fetchReviews()
    return () => { active = false }
  }, [product.id, refreshKey])

  async function submitProductReview(review) {
    if (!supabase) throw new Error('Supabase is not configured.')

    const { error: insertError } = await supabase
      .from('reviews')
      .insert({
        product_id: product.id,
        name: review.name.trim(),
        rating: review.rating,
        comment: review.comment.trim(),
        approved: false
      })

    if (insertError) {
      console.error('Could not submit product review:', insertError)
      throw insertError
    }

    setRefreshKey(value => value + 1)
  }

  const average = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '—'

  return (
    <div className="product-reviews-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section
        className="product-reviews-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-reviews-title"
      >
        <button className="product-reviews-close" onClick={onClose} aria-label="Close reviews">
          <X size={20} />
        </button>

        <div className="product-reviews-kicker"><MessageSquareText size={15} /> COMMUNITY LOVE</div>
        <h2 id="product-reviews-title">Reviews for <em>{product.name}</em></h2>
        <p className="product-reviews-intro">Tried this goodness? Tell others what you think.</p>

        <div className="review-summary">
          <div className="review-average">{average}</div>
          <div>
            <div className="review-summary-stars"><Star fill="currentColor" size={15} /> Customer ratings</div>
            <small>{reviews.length} approved {reviews.length === 1 ? 'review' : 'reviews'}</small>
          </div>
        </div>

        <div className="product-reviews-content">
          <div className="product-reviews-list">
            <h3>What customers say</h3>
            {loading ? (
              <p className="reviews-message">Loading product reviews…</p>
            ) : error ? (
              <p className="reviews-message">{error}</p>
            ) : reviews.length ? (
              <div className="product-review-cards">
                {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
              </div>
            ) : (
              <p className="reviews-message">No approved reviews yet. Be the first to share your experience!</p>
            )}
          </div>

          <ReviewForm onSubmit={submitProductReview} />
        </div>

        <p className="review-moderation-note">New reviews are checked by our team before appearing publicly. Thank you for sharing the love!</p>
      </section>
    </div>
  )
}
