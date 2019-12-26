export default class YtPreview extends React.Component {

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            {note.isPinned && <h1>📌</h1>}
            <iframe width="250" height="140.625" src={note.info.url}></iframe>
            <button onClick={this.props.onDeleteNote}>x</button>
        </div>
    }
}

