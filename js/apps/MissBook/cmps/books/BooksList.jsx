import BookPreview from './BookPreview.jsx'

export default function BooksList(props) {
    return <div className="flex wrap center">
        {props.books.map((book, i) => <BookPreview key={i} book={book} />)}
    </div>
}