import DynamicComponent from '../cmps/dynamics/DynamicComponent.jsx'

export default function NoteList(props) {
    return <div className='note-list-container'>
        {props.notes.map((note, i) => <DynamicComponent updateNote={props.updateNote} onSelectNote={props.onSelectNote} onDeleteNote={props.onDeleteNote} key={Date.now() + i} note={note} />)}
    </div>
}