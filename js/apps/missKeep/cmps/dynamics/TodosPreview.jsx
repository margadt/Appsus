export default class TodosPreview extends React.Component {

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            <h1>{note.info.label}</h1>
            <hr />
            {note.info.todos.map((todo, i) => <p key={Date.now() + i}>{todo.txt}  at  {todo.doneAt ? new Date(todo.doneAt).toLocaleString() : ''}</p>)}
            <button onClick={this.props.onDeleteNote} >x</button>
        </div>
    }
}
