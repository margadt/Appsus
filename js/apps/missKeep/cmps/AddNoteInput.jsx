export default class AddNoteInput extends React.Component {
    state = { type: '', input: '' }

    setType = (ev) => {
        ev.preventDefault();
        this.setState({ [ev.target.name]: ev.target.value });
    }

    onAddNote = () => {
        this.props.onAddNote(this.state.type, this.state.input);
        this.setState({ input: '' })
    }

    render() {
        return <div className='flex center border'>
            <input name='input' type="text" placeholder="What's on your mind?" onChange={this.setType} value={this.state.input} />
            <input type="radio" name="type" value="NoteText" onChange={this.setType} />Text
            <input type="radio" name="type" value="NoteImg" onChange={this.setType} />Img
            <input type="radio" name="type" value="NoteTodos" onChange={this.setType} />Todos
            <button onClick={this.onAddNote}>Add</button>
        </div>
    }
}