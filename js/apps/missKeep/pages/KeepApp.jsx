import Header from '../../cmps/Header.jsx'
import AddNoteInput from '../cmps/AddNoteInput.jsx'
import NoteList from '../cmps/NoteList.jsx'
import keepService from '../services/keepService.js'

export default class KeepApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.getNotes().then(notes => this.setState({ notes: notes }));
    }

    removeSelected = () => {
        this.setState({ selectedNote: null })
    }

    onSelectNote = (note) => {
        this.setState({ selectedNote: note })
        console.log('selected', note);
        
    }

    onAddNote = (type, val) => {
        keepService.addNote(type, val)
            .then(() => {
                this.loadNotes();
            });
    }

    onDeleteNote = () => {
        keepService.deleteNote(this.state.selectedNote)
            .then(() => {
                this.removeSelected()
                this.loadNotes();
            });
    }

    render() {
        return <header className='flex column'>
            <Header placeHolder="Search notes.."></Header>
            <AddNoteInput onAddNote={this.onAddNote}></AddNoteInput>
            <NoteList onSelectNote={this.onSelectNote} onDeleteNote={this.onDeleteNote} notes={[...this.state.notes]}></NoteList>
        </header>
    }
}


