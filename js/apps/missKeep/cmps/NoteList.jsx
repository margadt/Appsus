import DynamicComponent from '../cmps/dynamics/DynamicComponent.jsx'

export default function NoteList(props) {
    console.log(props);
    
    return <ul className='note-list-container'>
        {/* <h1>list</h1> */}
        {props.notes.map((note, i) => <DynamicComponent key={Date.now() + i} note={note} />)}
    </ul>
}