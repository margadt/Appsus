import DynamicComponent from '../cmps/dynamics/DynamicComponent.jsx'

export default function NoteList(props) {
    return <ul className='note-list-container'>
        {props.notes.map((note, i) => <DynamicComponent key={Date.now() + i} note={note} />)}
    </ul>
}