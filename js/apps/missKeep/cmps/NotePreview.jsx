export default class NoteText extends React.Component {


    render() {
        const { note } = this.props;
        return <Link to={`/book/${props.book.id}`}>
            <li className='book clean-list' onClick={this.onSelectBook}>
                <h2>{props.book.title}</h2>
                <h3><span className={props.class ? props.class : ''}>{props.book.listPrice.amount} </span>{this.state.icon}</h3>
            </li>
        </Link>
    }

}