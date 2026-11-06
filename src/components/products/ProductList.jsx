import ProductCard from './ProductCard'
export default function ProductList({products,onAdd,onDetails}){if(!products.length)return <div className="empty-state">No items found. Try another category or search term.</div>;return <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd} onDetails={onDetails}/>)}</div>}
