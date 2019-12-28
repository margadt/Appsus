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

    render() {
        return (
            <section>
                <h1>Books</h1>
                <Filter onFilter={this.onFilter}></Filter>
                <BooksList books={this.state.books}></BooksList>
            </section>
        )
    }
}