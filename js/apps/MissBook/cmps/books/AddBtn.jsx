export default class AddBtn extends React.Component {

    onAddBook = () => {
        this.props.onAddBook(this.props.book);
    }

    render() {
        return <span className='add-btn' onClick={this.onAddBook}>⊕</span>;
    }
}