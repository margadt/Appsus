import ReviewForm from './ReviewForm.jsx'
import DeleteReview from './DeleteReview.jsx'

export default class Reviews extends React.Component {
    state = { currReviewId: null }

    render() {
        return <div className='review'>
            <ReviewForm onSave={this.props.onAddReview}></ReviewForm>

            {this.props.book.reviews ? this.props.book.reviews.map((review, i) => {
                return <ul key={i}>
                    <li >Name: {review.name}</li>
                    <li >Rate: {review.rate}</li>
                    <li >Created: {review.created}</li>
                    <li className='textarea'>Review: {review.review}</li>
                    <DeleteReview reviewIdx={i} onDeleteBtn={this.props.onDeleteBtn} />
                </ul>
            }) : <p>No reviews</p>}
        </div>
    }
}