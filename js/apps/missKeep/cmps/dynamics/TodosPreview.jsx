import DeleteTodo from '../DeleteTodo.jsx'
import ColorPicker from '../ColorPicker.jsx'

export default class TodosPreview extends React.Component {
    state = {
        saveHidden: true,
        todos: { ...this.props.note.info.todos },
        label: this.props.note.info.label,
        colorHidden: true
    }

    onSaveBtn = () => {
        this.props.updateNote(this.props.note, this.state);
    }

    emitChangeLabel = (ev) => {
        this.setState({ label: ev.target.innerHTML }, console.log(this.state));
    }

    emitChangeTodos = (ev) => {
        let newState = { ...this.state.todos };
        newState[ev.target.title] = ev.target.innerHTML;
        this.setState({ todos: newState });
    }

    onToggleSave = (ev) => {
        ev.stopPropagation();
        this.setState(({ saveHidden: false }))
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
        return <div style={{ backgroundColor: note.style.backgroundColor }} className={'note' + (note.isPinned ? ' pinned' : '')} >
            {note.isPinned ? <i className="fas fa-map-pin pin"></i> : ''}
            < h1 name='label' contentEditable='true' onInput={this.emitChangeLabel} onClick={this.onToggleSave} suppressContentEditableWarning={true} > {note.info.label}</h1 >
            <hr />
            {note.info.todos.map((todo, i) => {
                let date = null;
                if ((todo.doneAt - (todo.doneAt - 86400000)) > 86400000) {
                    date = new Date(todo.doneAt).toLocaleString(navigator.language, { day: '2-digit', month: '2-digit', year: 'numeric' })
                } else {
                    date = new Date(todo.doneAt).toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' })
                }
                return <div className="todos-container flex space-between" key={i}>
                    <p title={'todo' + i} onClick={this.onToggleSave}
                        contentEditable='true' onInput={this.emitChangeTodos} suppressContentEditableWarning={true}
                    >{todo.txt}</p>
                    <div className="todo-date-container">
                    <p className='todos-date'> at {date}</p>
                    <DeleteTodo note={note} todoIdx={i} onDeleteTodo={this.props.onDeleteTodo} />
                    </div>
                </div>
            })}
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
