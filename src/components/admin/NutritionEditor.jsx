import NutritionFacts from '../products/NutritionFacts'
import { getProductNutrition } from '../../services/nutritionService'
import { products } from '../../data/data'
export default function NutritionEditor(){return <div className="admin-panel"><h3>Nutrition preview</h3><p>Calculated from the recipe quantities in the demo ingredient database.</p><div className="nutrition-admin-grid">{products.map(p=><div key={p.id}><b>{p.name}</b><NutritionFacts nutrition={getProductNutrition(p.id)}/></div>)}</div></div>}
