const { Link } = ReactRouterDOM;

export default function TextPreview(props) {
    const { note } = props;

    return <Link to={`/note/${note.id}`}>
        <div className='note'>
            <p>{note.info.txt}</p>
        </div>
    </Link>
}

