const { Link } = ReactRouterDOM;

export default function ImagePreview(props) {
    const { note } = props;

    return <Link to={`/note/${note.id}`}>
        <div className='note'>
            <img src={note.info.url} alt='note-img'/>
        </div>
    </Link>
}
