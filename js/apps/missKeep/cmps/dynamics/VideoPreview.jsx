import ColorPicker from '../ColorPicker.jsx'

export default class VideoPreview extends React.Component {
    state = {
        saveHidden: true,
        title: this.props.note.info.title,
        colorHidden: true
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

    onNotePinToggler = () => {
        this.props.onNotePinToggler(this.props.note);
    }

    onToggleColorPicker = () => {
        this.setState(prev => ({ colorHidden: !prev.colorHidden }));
    }

    render() {
        const { note } = this.props;
        return <div style={{ backgroundColor: note.style.backgroundColor }} className={'note' + (note.isPinned ? ' pinned' : '')}>
            {note.isPinned ? <i className="fas fa-map-pin pin"></i> : ''}
            <h1 contentEditable='true' onInput={this.emitChange} onClick={this.onToggleSave} suppressContentEditableWarning={true}>{note.info.title}</h1>
            <hr />
            <iframe type='text/html' width="250" height="140.625" src={note.info.url}></iframe>
            <hr />
            <div className="control-container">
                {!this.state.saveHidden && <i className="fas fa-save pointer" onClick={this.onSaveBtn}></i>}
                <i className="fas fa-thumbtack pointer" onClick={this.onNotePinToggler}></i>
                <i className="fas fa-palette pointer" onClick={this.onToggleColorPicker}></i>
                <i className="fas fa-trash pointer" onMouseUp={this.onDeleteNote}></i>
            </div>
            {!this.state.colorHidden && <div className="color-container">
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='aliceblue' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='aquamarine' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='coral' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='yellow' />
            </div>}
        </div>
    }
}

