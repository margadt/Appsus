export default class TextPreview extends React.Component {


    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            {note.isPinned ? <h1>📌</h1> : ''}
            <p> {note.info.txt}</p>
            <button onClick={this.props.onDeleteNote} >x</button>
        </div >
    }
}
