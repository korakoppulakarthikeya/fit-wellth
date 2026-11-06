import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import { products as fallback } from '../data/data'
import { readStorage } from '../utils/localStorage'
export function useProducts() {
  const [products, setProducts] = useState(() => readStorage('fitwellth-admin-products', fallback))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { let active = true; setLoading(true); getProducts().then(x => active && setProducts(x)).catch(e => active && setError(e.message)).finally(() => active && setLoading(false)); return () => { active = false } }, [])
  return { products, setProducts, loading, error }
}
