import BookPreview from "./BookPreview.jsx";
import AuthorsList from "./AuthorsList.jsx";
import CategoryList from "./CategoryList.jsx";
import LongTxt from "./LongTxt.jsx";
import Reviews from "./Reviews.jsx";
// const { Link } = ReactRouterDOM;

export default class BookDetails extends React.Component {
    state = { pageCount: '', publishedDate: '', bookPrice: 0, isOnSale: false, class: '', isLongTxtShown: false }

    componentDidMount() {
        this.checkAll();
    }

    onDelete = () => {
        this.props.onDelete(this.props.book)
    }

    checkAll = () => {
        this.checkPageCount();
        this.checkPublishedDate();
        this.checkPrice();
        this.checkIsOnSale();
    }

    checkPageCount = () => {
        let pageCount = this.props.book.pageCount;
        switch (true) {
            case pageCount < 100:
                this.setState({ pageCount: 'Light Reading' });
                break;
            case pageCount > 200 && pageCount < 500:
                this.setState({ pageCount: 'Light Reading' });
                break;
            case pageCount > 500:
                this.setState({ pageCount: 'Long reading' })
                break;
            default:
                this.setState({ pageCount: '' });
        }
    }

    checkPublishedDate = () => {
        let publishedDate = this.props.book.publishedDate;
        let currDate = new Date().getFullYear();

        switch (true) {
            case (currDate - publishedDate) >= 10:
                this.setState({ publishedDate: 'Veteran Book' });
                break;
            case (currDate - publishedDate) <= 1:
                this.setState({ publishedDate: 'New!' });
                break;
            default:
                this.setState({ publishedDate: publishedDate });
        }
    }

    checkPrice = () => {
        let bookPrice = +this.props.book.listPrice.amount;
        switch (true) {
            case bookPrice > 150:
                this.setState({ class: 'red' });
                break;
            case bookPrice < 20:
                this.setState({ class: 'green' });
                break;
        }
    }

    checkIsOnSale = () => {
        if (this.props.book.listPrice.isOnSale) {
            return;
        } else {
            this.setState({ isOnSale: true });
        }
    }

    onLngTxtToggle = () => {
        this.setState(prev => ({ isLongTxtShown: !prev.isLongTxtShown }));
    }

    render() {
        const { props } = this;

        return <div className="book-container">
            <BookPreview book={this.props.book} class={this.state.class} ></BookPreview>
            <img src={props.book.thumbnail} />
            <p>ID: {props.book.id}</p>
            <p>Authors: <AuthorsList book={this.props.book} /></p>
            <p>Language: {props.book.language}</p>
            <p>Published: {this.state.publishedDate}</p>
            <p>Subtitle: {props.book.subtitle}</p>
            <p>Description: <LongTxt text={props.book.description} isLongTxtShown={this.state.isLongTxtShown} />
                <span className="long-text" onClick={this.onLngTxtToggle}>{this.state.isLongTxtShown ?
                    'less' : 'more'}</span></p>
            <p>Page Count: {props.book.pageCount} - {this.state.pageCount}</p>
            <p>Categories: <CategoryList book={this.props.book} /></p>
            {this.state.isOnSale ? '' : <h1 className='red'> BOOK ON SALE!@#</h1>}

            <Reviews book={props.book} onAddReview={props.onAddReview} onDeleteBtn={props.onDeleteBtn}></Reviews>

            <button onClick={this.props.goBack}>BACK</button>
        </div>
    }
}