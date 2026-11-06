import { createContext, useContext, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/localStorage'
const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage('fitwellth-cart', []))
  function update(next) { setItems(next); writeStorage('fitwellth-cart', next) }
  function add(product) { const found = items.find(x => x.id === product.id); update(found ? items.map(x => x.id === product.id ? { ...x, quantity:x.quantity+1 } : x) : [...items, { ...product, quantity:1 }]) }
  function setQuantity(id, quantity) { update(quantity <= 0 ? items.filter(x => x.id !== id) : items.map(x => x.id === id ? { ...x, quantity } : x)) }
  function remove(id) { update(items.filter(x => x.id !== id)) }
  function clear() { update([]) }
  const total = useMemo(() => items.reduce((sum, x) => sum + x.price*x.quantity, 0), [items])
  const count = items.reduce((sum, x) => sum + x.quantity, 0)
  return <CartContext.Provider value={{ items, total, count, add, setQuantity, remove, clear }}>{children}</CartContext.Provider>
}
export const useCartContext = () => useContext(CartContext)
