import { supabase } from './supabase'
import { products as demoProducts } from '../data/data'
export async function getProducts() {
  if (!supabase) return demoProducts
  const { data, error } = await supabase.from('products').select('*').eq('available', true).order('created_at')
  if (error) throw error
  return data
}
export async function saveProduct(product) {
  if (!supabase) throw new Error('Supabase is not configured. Demo edits are stored locally in the browser.')
  const { data, error } = await supabase.from('products').upsert(product).select().single()
  if (error) throw error
  return data
}
