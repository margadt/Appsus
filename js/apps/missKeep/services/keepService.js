import { getRandomId } from '../../../services/utils.js'
import getDefaultNotes from '../data/defaultNotes.js'
import storageService from '../../../services/storageService.js'

export default { getNotes, addNote, deleteNote }

let gNotes = storageService.loadPromise('notes')
    .then(res => res ? res : getDefaultNotes());

function getNotes(filterBy) {
    console.log(filterBy);
    
    if (!filterBy || filterBy.title === null) return gNotes.then(notes => [...notes]);
    return gNotes.then(notes => {
        return [...notes.filter(note => {
            return note.info.title && note.info.title.includes(filterBy.title) ||
                note.info.txt && note.info.txt.includes(filterBy.title) ||
                note.info.label && note.info.label.includes(filterBy.title) ||
                note.info.todos && note.info.todos.some(todo => todo.txt.includes(filterBy.title))
        })];
    })
}

function addNote(type, val) {
    let newNote = null;

    switch (type) {
        case 'NoteText':
            newNote = addText(val);
            break;
        case 'NoteImg':
            newNote = addImg(val);
            break;
        case 'NoteTodos':
            newNote = addTodos(val);
            break;
        case 'NoteVideo':
            newNote = addVideo(val);
            break;
        default:
            return 'Wrong format';
    }

    gNotes = gNotes.then(notes => [...notes, newNote]);
    gNotes.then(notes => storageService.store('notes', notes));
    return Promise.resolve();
}

function addText(val) {
    return {
        id: getRandomId(),
        type: "NoteText",
        isPinned: true,
        info: {
            txt: val
        }
    }
}

function addImg(val) {
    return {
        id: getRandomId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            url: val,
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
}

function addTodos(val) {
    let todos = val.split(',');

    return {
        id: getRandomId(),
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "Todo:",
            todos: todos.map(todo => ({ txt: todo, doneAt: Date.now() }))
        }
    }
}

function addVideo(val) {
    let url = val.replace('watch?v=', 'embed/')
    return {
        id: getRandomId(),
        type: "NoteVideo",
        isPinned: false,
        info: {
            url: url
        }
    }
}
function deleteNote(delNote) {
    let newNotes = gNotes.then(notes => [...notes].filter(note => note.id !== delNote.id));
    gNotes = newNotes.then(res => [...res]);
    gNotes.then(notes => storageService.store('notes', notes));
    return Promise.resolve();

}