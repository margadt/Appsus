export default class TextPreview extends React.Component {
    state = {
        saveHidden: true,
        txt: this.props.note.info.txt
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state.txt);
    }

    emitChange = (ev) => {
        ev.preventDefault();
        this.setState({ txt: ev.target.innerHTML }, console.log);
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
            {note.isPinned ? <h1>📌</h1> : ''}
            <p contentEditable='true' onInput={this.emitChange} onClick={this.onToggleSave} suppressContentEditableWarning={true}> {note.info.txt}</p>
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div >
    }
}
