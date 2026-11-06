import ReviewCard from './ReviewCard'
export default function ReviewList({reviews}){return <div className="reviews-grid">{reviews.slice(0,3).map(r=><ReviewCard key={r.id} review={r}/>)}</div>}
