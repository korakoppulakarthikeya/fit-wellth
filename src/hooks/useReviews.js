import { useEffect, useState } from 'react'
import { addReview, getReviews } from '../services/reviewService'
export function useReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { getReviews().then(setReviews).finally(() => setLoading(false)) }, [])
  async function submit(review) { const saved = await addReview(review); setReviews(old => [saved, ...old]); return saved }
  return { reviews, loading, submit }
}
