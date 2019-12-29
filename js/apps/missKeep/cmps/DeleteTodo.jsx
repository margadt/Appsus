export default class DeleteTodo extends React.Component {
    onDeleteTodo = () => {
        this.props.onDeleteTodo(this.props.note, this.props.todoIdx);
    }

    render() {
        return <i className="far fa-times-circle pointer close-button flex-end" onClick={this.onDeleteTodo}></i>
    }
}