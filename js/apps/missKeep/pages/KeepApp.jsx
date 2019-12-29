import Header from '../cmps/Header.jsx'
import AddNoteInput from '../cmps/AddNoteInput.jsx'
import NoteList from '../cmps/NoteList.jsx'
import keepService from '../services/keepService.js'

export default class KeepApp extends React.Component {
    state = {
        notes: [],
        // selectedNote: null,
        filterBy: null,
        selectFilter: 'all'
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.getNotes(this.state.filterBy, this.state.selectFilter).then(notes => this.setState({ notes: notes }));
    }

    onAddNote = (type, val) => {
        keepService.addNote(type, val)
            .then(() => {
                this.loadNotes();
            });
    }

    onDeleteNote = (note) => {
        keepService.deleteNote(note)
            .then(() => {
                this.loadNotes();
            });
    }

    onFilter = (filterBy, selectFilter) => {
        console.log('onfilterBy:', filterBy,selectFilter);
        
        this.setState({ filterBy, selectFilter }, this.loadNotes);
    }

    updateNote = (updateNote, updatedVal) => {
        keepService.updateNote(updateNote, updatedVal)
            .then(() => this.loadNotes());
    }

    onDeleteTodo = (note, delTodo) => {
        keepService.deleteTodo(note, delTodo)
            .then(() => this.loadNotes());
    }

    onNotePinToggler = (note) => {
        keepService.notePinToggler(note)
            .then(() => this.loadNotes());
    }

    onChangeBgcColor = (note, color) => {
        keepService.changeNoteBgc(note, color)
            .then(() => this.loadNotes());
    }

    render() {
        return <header className='flex column'>
            <Header onFilter={this.onFilter} placeHolder="Search notes.."></Header>
            <AddNoteInput onAddNote={this.onAddNote}></AddNoteInput>
            <NoteList onChangeBgcColor={this.onChangeBgcColor} onNotePinToggler={this.onNotePinToggler} onDeleteTodo={this.onDeleteTodo} onDeleteNote={this.onDeleteNote} notes={[...this.state.notes]} updateNote={this.updateNote}></NoteList>
        </header>
    }
}


