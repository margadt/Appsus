export default class ImagePreview extends React.Component {
    state = {
        hidden: false,
        title: this.props.note.info.title
    }

    onSelectNote = () => {
        if (this.props.onSelectNote) {
            this.props.onSelectNote(this.props.note);
        }
    }

    onDelBtnToggler = () => {
        this.setState({ hidden: false });
    }

    emitChange = (ev) => {
        console.log('ev.pre');

        this.setState({ title: ev.currentTarget.textContent })
    }


    render() {
        const { note } = this.props;
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote}>
            <h2 contentEditable='true' onInput={this.emitChange} onClick={(ev)=>{ev.stopPropagation()}} suppressContentEditableWarning={true}>{note.info.title}</h2>
            <img src={note.info.url} alt='note-img' />
            {!this.state.hidden && <button onClick={this.props.onDeleteNote} >x</button>}
        </div>

    }
}
