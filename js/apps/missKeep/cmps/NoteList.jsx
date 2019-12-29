import DynamicComponent from '../cmps/dynamics/DynamicComponent.jsx'

export default function NoteList(props) {
    return <div className='note-list-container'>
        {props.notes.map((note, i) => <DynamicComponent updateNote={props.updateNote} onDeleteNote={props.onDeleteNote} key={note.id} note={note} />)}
    </div>
}