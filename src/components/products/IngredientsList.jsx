import { Check } from 'lucide-react'
export default function IngredientsList({items=[]}){return <div className="ingredients-list">{items.map(x=><span key={x}><Check size={14}/>{x}</span>)}</div>}
