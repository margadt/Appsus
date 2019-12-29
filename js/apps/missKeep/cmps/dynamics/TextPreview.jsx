import ColorPicker from '../ColorPicker.jsx'

export default class TextPreview extends React.Component {
    state = {
        saveHidden: true,
        colorHidden: true,
        title: this.props.note.info.title
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state.title);
        console.log(this.state.title);

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
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} style={{ backgroundColor: note.style.backgroundColor }}>
            {note.isPinned ? <h1>📌</h1> : ''}
            <p contentEditable='true' onInput={this.emitChange} onClick={this.onToggleSave} suppressContentEditableWarning={true}> {note.info.title}</p>
            {!this.state.saveHidden && <i className="fas fa-save pointer" onClick={this.onSaveBtn}></i>}
            <i className="fas fa-thumbtack pointer" onClick={this.onNotePinToggler}></i>
            <i className="fas fa-palette pointer" onClick={this.onToggleColorPicker}></i>
            <i className="far fa-times-circle pointer close-button flex-end" onMouseUp={this.onDeleteNote}></i>
            {!this.state.colorHidden && <div className="color-container">
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='red' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='blue' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='purple' />
                <ColorPicker note={note} onChangeBgcColor={this.props.onChangeBgcColor} color='yellow' />
            </div>}
        </div >
    }
}
