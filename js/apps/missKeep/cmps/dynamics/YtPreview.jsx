const { Link } = ReactRouterDOM;

export default function YtPreview(props) {
    const { note } = props;

    return <Link className={note.isPinned ? 'pinned' : ''} to={`/keep/${note.id}`}>
        <div className='note'>
            {note.isPinned ? <h1>📌</h1> : ''}
            <iframe width="250" height="140.625" src={note.info.url}></iframe>
            <button onClick={props.onDeleteNote} >x</button>
        </div>
    </Link>
}

