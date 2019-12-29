import BookPreview from './BookPreview.jsx'

export default function BooksList(props) {

    if (window.innerWidth <= 576) {
        let renderBooks = props.books.filter((book, i) => i < 5);
        return <div className="flex wrap center">
            {renderBooks.map((book, i) => <BookPreview key={i} book={book} />)}
        </div>
    }
    return <div className="flex wrap center">
        {props.books.map((book, i) => <BookPreview key={i} book={book} />)}
    </div>
}