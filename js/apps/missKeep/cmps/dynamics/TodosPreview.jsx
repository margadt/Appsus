export default class TodosPreview extends React.Component {
    state = {
        saveHidden: true,
        todos: { ...this.props.note.info.todos },
        label: this.props.note.info.label
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
        return <div className={'note' + (note.isPinned ? ' pinned' : '')} onClick={this.onSelectNote} >
            {note.isPinned ? <h1>📌</h1> : ''}
            < h1 name='label' contentEditable='true' onInput={this.emitChangeLabel} onClick={this.onEvStopProp} suppressContentEditableWarning={true} > {note.info.label}</h1 >
            <hr />
            {note.info.todos.map((todo, i) => {
                const date = new Date(todo.doneAt).toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
                return <div className="todos-container" key={todo+date}><p title={'todo' + i} onClick={this.onEvStopProp}
                    contentEditable='true' onInput={this.emitChangeTodos} suppressContentEditableWarning={true}
                >{todo.txt}</p> <p className='todos-date'>at {date}</p></div>
            })
            }
            < button onClick={this.props.onDeleteNote} > x</button >
            {!this.state.saveHidden && <button onClick={this.onSaveBtn}>Save</button>}
        </div>
    }
}
