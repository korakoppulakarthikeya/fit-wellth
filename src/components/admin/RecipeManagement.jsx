import { recipes } from '../../data/recipes'
import { ingredients } from '../../data/ingredients'
import { products } from '../../data/data'
export default function RecipeManagement(){return <div className="admin-panel"><h3>Recipe composition</h3><p>Each recipe links ingredients and measured quantities to a serving.</p>{recipes.map(r=><div className="recipe-row" key={r.id}><b>{products.find(p=>p.id===r.productId)?.name}</b><div>{r.ingredients.map(x=><span key={x.ingredientId}>{ingredients.find(i=>i.id===x.ingredientId)?.name}: <strong>{x.quantity}{ingredients.find(i=>i.id===x.ingredientId)?.unit}</strong></span>)}</div></div>)}</div>}
