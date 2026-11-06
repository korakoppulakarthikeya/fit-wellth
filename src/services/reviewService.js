import { readStorage, writeStorage } from '../utils/localStorage'
import { supabase } from './supabase'
const KEY = 'fitwellth-reviews'
const initial = [
  { id:'r1', name:'Priya', rating:5, comment:'Fresh, filling and delicious. The chocolate oats are my favourite!', date:'2026-10-28' },
  { id:'r2', name:'Kiran', rating:5, comment:'Loved the traditional ragi malt. Simple and refreshing.', date:'2026-10-30' }
]
export async function getReviews() {
  if (supabase) {
    const { data, error } = await supabase.from('reviews').select('*').eq('approved', true).order('created_at', { ascending:false })
    if (error) throw error
    return data
  }
  return readStorage(KEY, initial)
}
export async function addReview(review) {
  if (supabase) {
    const { data, error } = await supabase.from('reviews').insert({ ...review, approved:false }).select().single()
    if (error) throw error
    return data
  }
  const all = readStorage(KEY, initial)
  const next = [{ ...review, id:crypto.randomUUID(), date:new Date().toISOString().slice(0,10) }, ...all]
  writeStorage(KEY, next)
  return next[0]
}
