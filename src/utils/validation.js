export const isValidReview = review => Boolean(review.name?.trim() && review.comment?.trim() && Number(review.rating) >= 1 && Number(review.rating) <= 5)
