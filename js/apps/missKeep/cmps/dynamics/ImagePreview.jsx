const { Link } = ReactRouterDOM;

export default class ImagePreview extends React.Component {


    // onChange = (ev) => {
    //     this.props.onUpdateNote()
    // }


    render() {
        const { note } = this.props;
        return <Link to={`/keep/${note.id}`}>
            <div className='note'>
                <h2>{note.info.title}</h2>
                <img src={note.info.url} alt='note-img' />
                <button onClick={this.props.onDeleteNote} >x</button>
            </div>
        </Link>
    }
}
