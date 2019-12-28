export default class AddNoteInput extends React.Component {
    state = { type: '', input: '', placeHolder: 'What\'s on your mind?' }

    setType = (ev) => {
        ev.preventDefault();
        switch (ev.target.value) {
            case 'NoteText':
                this.setState({ placeHolder: 'What\'s on your mind?' });
                break;
            case 'NoteImg':
                this.setState({ placeHolder: 'Enter image URL..' })
                break;
            case 'NoteTodos':
                this.setState({ placeHolder: 'Enter comma separated list..' })
                break;
            case 'NoteVideo':
                this.setState({ placeHolder: 'Enter youtube URL..' })
                break;
        }
        this.setState({ [ev.target.name]: ev.target.value });
    }

    onAddNote = () => {
        this.props.onAddNote(this.state.type, this.state.input);
        this.setState({ input: '' })
    }

    render() {
        return <div className='flex center border input-menu'>
            <input className='text-input' name='input' type="text" placeholder={this.state.placeHolder} onChange={this.setType} value={this.state.input} />
            <input className='pointer radio' type="radio" name="type" value="NoteText" onChange={this.setType} />Text
            <input className='pointer radio' type="radio" name="type" value="NoteImg" onChange={this.setType} />Img
            <input className='pointer radio' type="radio" name="type" value="NoteTodos" onChange={this.setType} />Todos
            <input className='pointer radio' type="radio" name="type" value="NoteVideo" onChange={this.setType} />Video
            <button className='add-note pointer' onClick={this.onAddNote}>Add</button>
        </div>
    }
}