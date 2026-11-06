import { X } from 'lucide-react'
import QuantityControl from './QuantityControl'
import { formatCurrency } from '../../utils/formatCurrency'
export default function CartItem({item,onQuantity,onRemove}){return <div className="cart-item"><img src={item.image} alt=""/><div className="cart-item-info"><b>{item.name}</b><small>{formatCurrency(item.price)} · {item.size}</small><QuantityControl value={item.quantity} onChange={q=>onQuantity(item.id,q)}/></div><strong>{formatCurrency(item.price*item.quantity)}</strong><button className="remove-item" onClick={()=>onRemove(item.id)} aria-label="Remove item"><X size={15}/></button></div>}
