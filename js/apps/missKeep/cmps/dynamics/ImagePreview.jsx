export default class ImagePreview extends React.Component {
    state = {
        saveHidden: true,
        title: this.props.note.info.title
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state.title);
    }

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    emitChange = (ev) => {
        ev.preventDefault();
        this.setState({ title: ev.target.innerHTML });
    }

    onEvStopProp = (ev) => {
        ev.stopPropagation();
        this.setState({ saveHidden: false })
    }


    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            <h2 contentEditable='true' onInput={this.emitChange} onClick={this.onEvStopProp} suppressContentEditableWarning={true}>{note.info.title}</h2>
            <img src={note.info.url} alt='note-img' />
            <button onClick={this.props.onDeleteNote} >x</button>
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div>
    }
}
