import { Minus, Plus } from 'lucide-react'
export default function QuantityControl({value,onChange}){return <div className="quantity-control"><button onClick={()=>onChange(value-1)} aria-label="Decrease quantity"><Minus size={13}/></button><b>{value}</b><button onClick={()=>onChange(value+1)} aria-label="Increase quantity"><Plus size={13}/></button></div>}
