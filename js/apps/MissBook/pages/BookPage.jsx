import { getBookById, addReview, deleteReview } from '../services/booksServices.js'
import BookDetails from '../cmps/books/BookDetails.jsx'

export default class BookPage extends React.Component {
    state = { book: null }

    componentDidMount() {
        this.loadBook();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id
            !== this.props.match.params.id) {
            this.loadBook();
        }
    }

    loadBook() {
        const { bookId } = this.props.match.params;
        getBookById(bookId).then(book => this.setState({ book }));
    }

    goBack = () => {
        this.props.history.push('/book')
        // this.props.history.goBack()
    }

    onAddReview = (review) => {
        addReview(this.state.book.id, review).then(book => {
            this.setState({ book })
        })
    }

    onDeleteBtn = (reviewIdx) => {
        deleteReview(this.state.book, reviewIdx).then(() => this.loadBook());
    }

    render() {
        if (!this.state.book) return <div className="loading">Loading...</div>
        return <BookDetails book={this.state.book} onAddReview={this.onAddReview} goBack={this.goBack} onDeleteBtn={this.onDeleteBtn}></BookDetails>

    }
}