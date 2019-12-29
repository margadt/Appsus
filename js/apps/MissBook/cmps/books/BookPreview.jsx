import { setPriceClass, isOnSaleThumbnails, formatCurrency } from '../../services/booksDetailsServices.js'

const { Link } = ReactRouterDOM;

export default class BookPreview extends React.Component {

    onSelectBook = () => {
        if (this.props.onSelectBook)
            this.props.onSelectBook(this.props.book);
    }

    render() {
        const { props } = this;
        return <Link to={`/book/${props.book.id}`}>
            <div className="book-container flex column center pointer" onClick={this.onSelectBook}>
                <div className="thumbnail-container flex center align-center">
                    <img src={props.book.thumbnail} height="130" width="100" />
                </div>
                <div className="info-container">
                    <h2 className="book-title capitalize">{props.book.title}</h2>
                    <div className="price flex center align-center">
                        <span className={setPriceClass(props.book.listPrice.amount)}>{props.book.listPrice.amount} </span>
                        <span>{formatCurrency(props.book.listPrice.currencyCode)}</span>
                        <img src={isOnSaleThumbnails(props.book.listPrice.isOnSale)} />
                    </div>
                </div>
            </div>
        </Link>
    }

}