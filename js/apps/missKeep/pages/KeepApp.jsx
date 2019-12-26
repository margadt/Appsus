import Header from '../../cmps/Header.jsx'
import AddNoteInput from '../cmps/AddNoteInput.jsx'
import NoteList from '../cmps/NoteList.jsx'
import keepService from '../services/keepService.js'

export default class KeepApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.getNotes(this.state.filterBy).then(notes => this.setState({ notes: notes }));
    }

    removeSelected = () => {
        this.setState({ selectedNote: null })
    }

    onSelectNote = (note) => {
        this.setState({ selectedNote: note })
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

    onFilter = (filterBy) =>{
        this.setState({filterBy} , this.loadNotes);
    }

    render() {
        return <header className='flex column'>
            <Header onFilter={this.onFilter} placeHolder="Search notes.."></Header>
            <AddNoteInput onAddNote={this.onAddNote}></AddNoteInput>
            <NoteList onSelectNote={this.onSelectNote} onDeleteNote={this.onDeleteNote} notes={[...this.state.notes]}></NoteList>
        </header>
    }
}


