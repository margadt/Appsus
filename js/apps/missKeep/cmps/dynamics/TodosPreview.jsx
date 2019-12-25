const { Link } = ReactRouterDOM;

export default function TodosPreview(props) {
    const { note } = props;

    return <Link to={`/note/${note.id}`}>
        <div className='note'>
            <h1>{note.info.label}</h1>
            <hr />
            {note.info.todos.map(todo => <p>{todo.txt}  at  {note.info.dontAt ? new Date(note.info.doneAt).toLocaleString() : ''}</p>)}
        </div>
    </Link>
}
