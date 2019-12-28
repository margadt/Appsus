export default class DeleteReview extends React.Component {

    onDeleteBtn = () => {
        this.props.onDeleteBtn(this.props.reviewIdx);
    }

    render() {
        return <p className='delete-x' onClick={this.onDeleteBtn}>x</p>
    }
}

