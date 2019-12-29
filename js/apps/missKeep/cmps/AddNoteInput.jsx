import RadioFake from "./RadioFake.jsx"
export default class AddNoteInput extends React.Component {
    state = { type: 'NoteText', input: '', placeHolder: 'What\'s on your mind?' }

    onSetType = (type) => {
        switch (type) {
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
        this.setState({ type });
    }

    emitChange = (ev) => {
        ev.preventDefault();
        this.setState({ [ev.target.name]: ev.target.value });
    }

    onAddNote = () => {
        this.props.onAddNote(this.state.type, this.state.input);
        this.setState({ input: '' })
    }

    render() {
        return <div className='flex center align-center input-menu'>
            <input id='text-input' className='text-input' name='input' type="text" placeholder={this.state.placeHolder} onChange={this.emitChange} value={this.state.input} />
            <div className="type-container flex space-between align-center">
                <RadioFake type='NoteText' fontClass={'radio fas fa-file-alt '} currType={this.state.type} onSetType={this.onSetType} />
                <RadioFake type='NoteImg' fontClass={'radio fas fa-image'} currType={this.state.type} onSetType={this.onSetType} />
                <RadioFake type='NoteTodos' fontClass={'radio fas fa-list'} currType={this.state.type} onSetType={this.onSetType} />
                <RadioFake type='NoteVideo' fontClass={'radio fab fa-youtube'} currType={this.state.type} onSetType={this.onSetType} />
                <button className='add-note pointer' onClick={this.onAddNote}>Add</button>
            </div>
        </div>
    }
}

//     render() {
//         return <div className='flex center align-center input-menu'>
//             <label for='text-input' >
//             <input id='text-input' className='text-input' name='input' type="text" placeholder={this.state.placeHolder} onChange={this.setType} value={this.state.input} />
//                 <i class="fas fa-text"></i><input className='pointer radio' type="radio" name="type" value="NoteText" onChange={this.setType} />
//             </label>
//             <input className='pointer radio' type="radio" name="type" value="NoteImg" onChange={this.setType} />Img
//             <input className='pointer radio' type="radio" name="type" value="NoteTodos" onChange={this.setType} />Todos
//             <input className='pointer radio' type="radio" name="type" value="NoteVideo" onChange={this.setType} />Video
//             <button className='add-note pointer' onClick={this.onAddNote}>Add</button>
//         </div>
//     }
// }

// <input type="radio" name="option" id="radio1" checked />
//     <label for="radio1">
//         <span class="fa-stack">
//             <i class="fa fa-circle-o fa-stack-1x"></i>
//             <i class="fa fa-circle fa-stack-1x"></i>
//         </span>
//         Hombre
//         </label> <br />