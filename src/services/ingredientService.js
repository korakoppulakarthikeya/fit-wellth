import { ingredients as demoIngredients } from '../data/ingredients'
import { supabase } from './supabase'
export async function getIngredients() {
  if (!supabase) return demoIngredients
  const { data, error } = await supabase.from('ingredients').select('*').order('name')
  if (error) throw error
  return data
}
