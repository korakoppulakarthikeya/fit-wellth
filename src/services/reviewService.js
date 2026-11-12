
import { readStorage, writeStorage } from '../utils/localStorage'
import { supabase } from './supabase'

const KEY = 'fitwellth-reviews'

const initial = [
  {
    id: 'r1',
    name: 'Priya',
    rating: 5,
    comment: 'Fresh, filling and delicious. The chocolate oats are my favourite!',
    date: '2026-10-28'
  },
  {
    id: 'r2',
    name: 'Kiran',
    rating: 5,
    comment: 'Loved the traditional ragi malt. Simple and refreshing.',
    date: '2026-10-30'
  }
]

// Fetch only general FitWellth reviews
export async function getReviews() {
  if (supabase) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .is('product_id', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  }

  return readStorage(KEY, initial)
}

// Submit general FitWellth review
export async function addReview(review) {
  if (supabase) {
    const reviewData = {
      name: review.name.trim(),
      product: 'Fit Wellth',
      product_id: null,
      rating: Number(review.rating),
      comment: review.comment.trim(),
      message: review.comment.trim(),
      approved: false
    }

    const { error } = await supabase
      .from('reviews')
      .insert(reviewData)

    if (error) {
      console.error('General review submission error:', error)
      throw error
    }

    return true
  }

  const all = readStorage(KEY, initial)

  const next = [
    {
      ...review,
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10)
    },
    ...all
  ]

  writeStorage(KEY, next)

  return next[0]
}
