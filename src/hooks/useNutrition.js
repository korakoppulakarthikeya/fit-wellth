import { getProductNutrition } from '../services/nutritionService'
export function useNutrition(productId) { return getProductNutrition(productId) }
