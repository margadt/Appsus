'use strict'
import { getBooks } from '../services/booksServices.js'
import BooksList from '../cmps/books/BooksList.jsx'
// import BookDetails from '../cmps/books/BookDetails.jsx'
// import BookForm from '../cmps/books/BookForm.jsx';
import Filter from '../cmps/books/Filter.jsx';

export default class BooksApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        getBooks(this.state.filterBy).then(newBooks => this.setState({ books: newBooks }));
    }

    onFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);
    }

    onGoToAdd = () => {
        this.props.history.push('/addBook');
    }

    render() {
        return (
            <div className="books-main-container flex column">
                <Filter onFilter={this.onFilter}></Filter>
                <i className="fas fa-book-medical pointer" onClick={this.onGoToAdd}></i>
                <BooksList books={this.state.books}></BooksList>
            </div>
        )
    }
}