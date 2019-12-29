export default class VideoPreview extends React.Component {
    state = {
        saveHidden: true,
        title: this.props.note.info.title
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state.title);
    }

    emitChange = (ev) => {
        ev.preventDefault();
        this.setState({ title: ev.target.innerHTML }, console.log);
    }

    onToggleSave = () => {
        this.setState({ saveHidden: false })
    }

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    onDeleteNote = () => {
        this.props.onDeleteNote(this.props.note);
    }

    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')}>
            <i className="far fa-times-circle pointer close-button flex-end" onMouseUp={this.onDeleteNote}></i>
            {note.isPinned && <h1>📌</h1>}
            <h2 contentEditable='true' onInput={this.emitChange} onClick={this.onToggleSave} suppressContentEditableWarning={true}>{note.info.title}</h2>
            <iframe type='text/html' width="250" height="140.625" src={note.info.url}></iframe>
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div>
    }
}

