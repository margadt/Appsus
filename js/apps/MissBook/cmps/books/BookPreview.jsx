const { Link } = ReactRouterDOM;

export default class BookPreview extends React.Component {
    state = { icon: '' }

    componentDidMount() {
        this.checkCurrencyCode();
    }


    onSelectBook = () => {
        if (this.props.onSelectBook)
            this.props.onSelectBook(this.props.book);
    }

    checkCurrencyCode = () => {
        const { props } = this;
        switch (props.book.listPrice.currencyCode) {
            case 'ILS':
                this.setState({ icon: '₪' });
                break;
            case 'USD':
                this.setState({ icon: '$' });
                break;
            case 'EUR':
                this.setState({ icon: '€' });
                break;
        }
    }

    render() {
        const { props } = this;
        return <Link to={`/book/${props.book.id}`}>
            <li className='book clean-list' onClick={this.onSelectBook}>
                <h2>{props.book.title}</h2>
                <h3><span className={props.class ? props.class : ''}>{props.book.listPrice.amount} </span>{this.state.icon}</h3>
            </li>
        </Link>
    }

}