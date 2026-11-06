import { recipes } from '../data/recipes'
import { supabase } from './supabase'
export async function getRecipes() {
  if (!supabase) return recipes
  const { data, error } = await supabase.from('recipes').select('*, recipe_ingredients(*)')
  if (error) throw error
  return data
}
