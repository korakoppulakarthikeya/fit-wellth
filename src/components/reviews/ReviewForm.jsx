
import { useState } from 'react'
import { Star, Send } from 'lucide-react'

export default function ReviewForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(e) {
    e.preventDefault()

    if (!name.trim() || !comment.trim()) {
      setStatus('Please enter your name and review.')
      return
    }

    setSubmitting(true)
    setStatus('')

    try {
      await onSubmit({ name, comment, rating })

      setName('')
      setComment('')
      setRating(5)
      setStatus('Thank you! Your review has been submitted.')
    } catch (error) {
      console.error('Review form error:', error)
      setStatus(error.message || 'Could not submit your review.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="review-form" onSubmit={submit}>
      <h3>Share a little love</h3>

      <label>Your rating</label>

      <div className="rating-picker">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            className={n <= rating ? 'selected' : ''}
            aria-label={`${n} stars`}
          >
            <Star
              size={22}
              fill={n <= rating ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>

      <input
        required
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
      />

      <textarea
        required
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tell us what you enjoyed..."
        rows="3"
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Send review'}
        <Send size={15} />
      </button>

      {status && (
        <small className="form-status">{status}</small>
      )}
    </form>
  )
}
