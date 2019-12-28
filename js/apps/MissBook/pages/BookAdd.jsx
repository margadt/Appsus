import { getQuery } from '../services/bookQuery.js'
import { addBook } from '../services/booksServices.js'
import QueryResponse from '../cmps/books/QueryResponse.jsx'
import eventBusService from "../../../services/eventBusService.js";




export default class BookAdd extends React.Component {
    state = { query: '', googleBooks: [] }

    // componentWillUnmount() {
    //     console.log(this.props.toggleModal);

    //     setTimeout(() => {
    //         this.props.toggleModal();
    //     }, 3000);
    // }

    onQuery = () => {
        getQuery(this.state.query).then(res => this.setState(({ googleBooks: res.data.items.slice(0, 5) })))
    }

    changeInput = (ev) => {
        ev.preventDefault();
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value }, this.onQuery);
    }

    onAddBook = (book) => {
        if (!book) return;
        addBook(book).then(bookId => {
            this.props.history.push(`/book/${bookId}`);
        });
    }



    render() {
        return <div>
            <input type='text' name='query' value={this.state.query} onChange={this.changeInput} placeholder='Book name' />
            <QueryResponse books={this.state.googleBooks} onAddBook={this.onAddBook} />
        </div>
    }
}