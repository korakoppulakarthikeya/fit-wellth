import { calculateNutrition } from '../utils/nutritionCalculator'
import { ingredients } from '../data/ingredients'
import { recipes } from '../data/recipes'
export function getProductNutrition(productId) {
  const recipe = recipes.find(r => r.productId === productId)
  return recipe ? calculateNutrition(recipe, ingredients) : null
}
