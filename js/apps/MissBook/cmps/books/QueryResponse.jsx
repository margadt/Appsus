import AddBtn from './AddBtn.jsx'

export default class QueryResponse extends React.Component {

    onAddBook = (book) => {
        this.props.onAddBook(book);
    }

    render() {
        return this.props.books && <ul className="search-result-ul">
            {this.props.books.map((book, i) => <li key={Date.now() + i}>{book.volumeInfo.title}<AddBtn book={book} onAddBook={this.onAddBook} /> </li>)}
        </ul>
    }
}