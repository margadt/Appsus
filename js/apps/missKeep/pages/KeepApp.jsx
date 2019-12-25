import Header from '../cmps/Header.jsx'
import AddNoteInput from '../cmps/AddNoteInput.jsx'
import NoteList from '../cmps/NoteList.jsx'
import keepService from '../services/keepService.js'

export default class KeepApp extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.getNotes().then(notes => this.setState({ notes: notes }));
    }

    render() {
        return <header className='flex column'>
            <Header imgSrc='../../../../img/temp-logo.png'></Header>
            <AddNoteInput ></AddNoteInput>
            <NoteList notes={[...this.state.notes]}></NoteList>
        </header>
    }
}


