import { useParams, Link } from 'react-router-dom'
import { products } from '../data/data'
import ProductDetails from '../components/products/ProductDetails'
import { useCartContext } from '../context/CartContext'
export default function ProductPage(){const {slug}=useParams();const product=products.find(p=>p.slug===slug);const cart=useCartContext();if(!product)return <div className="not-found"><h1>Product not found</h1><Link to="/">Back to menu</Link></div>;return <main className="standalone-product"><ProductDetails product={product} onClose={()=>history.back()} onAdd={cart.add}/></main>}
