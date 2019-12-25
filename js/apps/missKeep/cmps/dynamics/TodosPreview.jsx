const { Link } = ReactRouterDOM;

export default function TodosPreview(props) {
    const { note } = props;
    console.log(note);

    return <Link to={`/note/${note.id}`}>
        <div className='note'>
            <h1>{note.info.label}</h1>
            <hr />
            {note.info.todos.map((todo, i) => <p key={Date.now() + i}>{todo.txt}  at  {todo.doneAt ? new Date(todo.doneAt).toLocaleString() : ''}</p>)}
        </div>
    </Link>
}
