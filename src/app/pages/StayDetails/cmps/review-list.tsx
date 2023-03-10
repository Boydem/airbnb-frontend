import moment from 'moment'
import { useState } from 'react'
import { IReview } from '../../../interfaces/review'

export function ReviewList({ reviewsToDisplay }: { reviewsToDisplay: IReview[] }) {
    return (
        <ul className='reviews-list clean-list flex column'>
            {reviewsToDisplay && reviewsToDisplay.map(review => <ReviewListItem key={review.id} review={review} />)}
        </ul>
    )
}

function ReviewListItem({ review }: { review: IReview }) {
    const [isShowingMore, setIsShowingMore] = useState(false)
    const maxCharacters = 200

    let reviewText = review.txt
    if (!isShowingMore && reviewText.length > maxCharacters) {
        const lastSpaceIndex = reviewText.lastIndexOf(' ', maxCharacters)
        reviewText = reviewText.substring(0, lastSpaceIndex) + '...'
    }

    const showMoreButton = review.txt.length > maxCharacters && (
        <button onClick={() => setIsShowingMore(prev => !prev)}>{!isShowingMore ? 'Show More' : 'Show Less'}</button>
    )

    return (
        <li className='review-list-item'>
            <section className='review-by flex align-center'>
                <img className='avatar sm' src={review.by.imgUrl} alt={review.by.fullname} />
                <div>
                    <p className='font-medium'>{review.by.fullname}</p>
                    <p className='text-muted'>{moment(review.createdAt).format('MMMM YYYY')}</p>
                </div>
            </section>
            <section className={`review-body`}>{reviewText}</section>
            {showMoreButton}
        </li>
    )
}
