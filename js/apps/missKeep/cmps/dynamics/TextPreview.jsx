const { Link } = ReactRouterDOM;

export default function TextPreview(props) {
    const { note } = props;

    return <Link className={note.isPinned ? 'pinned' : ''} to={`/keep/${note.id}`}>
        <div className='note'>
            {note.isPinned ? <h1>📌</h1> : ''}
            <p>{note.info.txt}</p>
        </div>
    </Link>
}

