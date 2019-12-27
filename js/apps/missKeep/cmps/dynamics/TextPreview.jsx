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

    onEvStopProp = (ev) => {
        ev.stopPropagation();
        this.setState({ saveHidden: false })
    }

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            {note.isPinned ? <h1>📌</h1> : ''}
            <p contentEditable='true' onInput={this.emitChange} onClick={this.onEvStopProp} suppressContentEditableWarning={true}> {note.info.txt}</p>
            <button onClick={this.props.onDeleteNote} >x</button>
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div >
    }
}
