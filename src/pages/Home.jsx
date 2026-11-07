import { useMemo, useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import { useReviews } from '../hooks/useReviews'
import { categories } from '../data/data'
import Hero from '../components/home/Hero'
import ValuesStrip from '../components/home/ValuesStrip'
import StorySection from '../components/home/StorySection'
import CTASection from '../components/home/CTASection'
import ProductFilter from '../components/products/ProductFilter'
import ProductList from '../components/products/ProductList'
import ProductDetails from '../components/products/ProductDetails'
import ReviewList from '../components/reviews/ReviewList'
import ReviewForm from '../components/reviews/ReviewForm'
import ProductReviews from '../components/reviews/ProductReviews'
import { Leaf } from 'lucide-react'

export default function Home() {
  const { products } = useProducts()
  const cart = useCartContext()
  const { reviews, submit } = useReviews()
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [reviewProduct, setReviewProduct] = useState(null)

  const filtered = useMemo(
    () => products.filter(product =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      product.available !== false
    ),
    [products, category, search]
  )

  return (
    <main>
      <Hero />
      <ValuesStrip />

      <section className="menu-section section-pad" id="menu">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><Leaf size={15} /> THE GOOD STUFF</div>
            <h2>Find your <em>feel-good</em><br />favourite.</h2>
          </div>
          <p>Wholesome, comforting and made with care. Pick a bowl, sip or snack for your day.</p>
        </div>

        <ProductFilter
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          categories={categories}
        />

        <ProductList
          products={filtered}
          onAdd={cart.add}
          onDetails={setSelected}
          onReview={setReviewProduct}
        />
      </section>

      <StorySection />

      <section className="reviews-section section-pad" id="reviews">
        <div className="section-heading">
          <div>
            <div className="eyebrow">KIND WORDS, FULL HEARTS</div>
            <h2>Goodness worth<br /><em>sharing.</em></h2>
          </div>
          <p>A little note from people who have made FitWellth part of their day.</p>
        </div>
        <ReviewList reviews={reviews} />
        <ReviewForm onSubmit={submit} />
      </section>

      <CTASection />

      <ProductDetails
        product={selected}
        onClose={() => setSelected(null)}
        onAdd={cart.add}
      />

      {reviewProduct && (
        <ProductReviews
          product={reviewProduct}
          onClose={() => setReviewProduct(null)}
        />
      )}

      <div className="bottom-note">
        <span>✳</span> Eat Healthy. Stay Strong. Live Longer. <span>✳</span>
      </div>
    </main>
  )
}
