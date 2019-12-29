import AuthorsList from "./AuthorsList.jsx";
import CategoryList from "./CategoryList.jsx";
import LongTxt from "./LongTxt.jsx";
import Reviews from "./Reviews.jsx";
import { setPriceClass, isOnSale, formatCurrency } from '../../services/booksDetailsServices.js'
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

    formatLanguage = () => {
        const language = this.props.book.language;
        switch (true) {
            case (language === 'he'):
                return 'Hebrew';
            case (language === 'en'):
                return 'English';
            case (language === 'sp'):
                return 'Spanish';
        }
    }

    render() {
        const { props } = this;

        return <React.Fragment>
            <div className="book-details-container grid">
                <div className="book-image">
                    <img src={props.book.thumbnail} />
                </div>
                <div className="book-info-container">
                    <div className="capitalize">Title: {this.props.book.title}</div>
                    <div>Subtitle: {this.props.book.subtitle}</div>
                    <div>Authors: <AuthorsList book={this.props.book} /></div>
                    <div>Published Date: {this.state.publishedDate}</div>
                    <div>Description: <LongTxt text={props.book.description} isLongTxtShown={this.state.isLongTxtShown} />
                        <span className="long-text" onClick={this.onLngTxtToggle}>{this.state.isLongTxtShown ?
                            'less' : 'more'}</span></div>
                    <div>Number of pages: {props.book.pageCount} - {this.state.pageCount}</div>
                    <div>Categories: <CategoryList book={this.props.book} /></div>
                    <div>Language: {this.formatLanguage()}</div>
                    <div><span className={setPriceClass(this.props.book.listPrice.amount)}>{this.props.book.listPrice.amount}</span>
                        <span>{formatCurrency(this.props.book.listPrice.currencyCode)}</span></div>
                    <div><img src={isOnSale(this.props.book.listPrice.isOnSale)} /></div>
                </div>
                <Reviews book={props.book} onAddReview={props.onAddReview} onDeleteBtn={props.onDeleteBtn}></Reviews>
                <div className="book-nav-buttons-container flex center">
                    <div className="book-nav-button pointer" onClick={this.props.goBack}>Back</div>
                </div>
            </div>
        </React.Fragment>
    }
}