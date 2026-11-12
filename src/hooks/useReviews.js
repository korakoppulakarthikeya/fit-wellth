
import { useEffect, useState } from 'react'
import { addReview, getReviews } from '../services/reviewService'

export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadReviews() {
      try {
        const data = await getReviews()

        if (active) {
          setReviews(data || [])
        }
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadReviews()

    return () => {
      active = false
    }
  }, [])

  async function submit(review) {
    await addReview(review)

    // Do not add pending reviews to the public list.
    // They will appear after admin approval.
  }

  return {
    reviews,
    loading,
    submit
  }
}
