const fields = ['kcal','protein','carbs','fat','fibre','sugar','saturatedFat','addedSugar']
export function calculateNutrition(recipe, ingredientData) {
  const total = Object.fromEntries(fields.map(k => [k, 0]))
  for (const item of recipe?.ingredients ?? []) {
    const ingredient = ingredientData.find(x => x.id === item.ingredientId)
    if (!ingredient) continue
    const factor = Number(item.quantity || 0) / 100
    fields.forEach(field => total[field] += (Number(ingredient[field]) || 0) * factor)
  }
  return Object.fromEntries(fields.map(k => [k, Math.round(total[k] * 10) / 10]))
}
