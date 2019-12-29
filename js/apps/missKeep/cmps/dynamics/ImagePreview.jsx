export default class ImagePreview extends React.Component {
    state = {
        saveHidden: true,
        title: this.props.note.info.title
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state.title);
    }

    emitChange = (ev) => {
        ev.preventDefault();
        this.setState({ title: ev.target.innerHTML });
    }

    onToggleSave = () => {
        this.setState({ saveHidden: false })
    }

    onDeleteNote = () => {
        this.props.onDeleteNote(this.props.note);
    }


    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')}>
            <i className="far fa-times-circle pointer close-button flex-end" onMouseUp={this.onDeleteNote}></i>
            {note.isPinned ? <h1>📌</h1> : ''}
            <h2 contentEditable='true' onInput={this.emitChange} onClick={this.onToggleSave} suppressContentEditableWarning={true}>{note.info.title}</h2>
            <img src={note.info.url} alt='note-img' />
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div>
    }
}
