'use strict'
import { getRandomId } from '../../../services/utils.js'
import getDefaultNotes from '../data/defaultNotes.js'
import storageService from '../../../services/storageService.js'

export default { getNotes, addNote, deleteNote, updateNote, deleteTodo, notePinToggler, changeNoteBgc }

let gNotes = storageService.loadPromise('notes')
    .then(res => res ? res : getDefaultNotes());

function getNotes(filterBy, selectFilter) {
    switch (selectFilter) {
        case 'isPinned':
            if (!filterBy || filterBy.title === null) return gNotes.then(notes => [...notes]);
            return gNotes.then(notes => {
                return [...notes.filter(note => {
                    return note.isPinned === true && note.info.title && note.info.title.includes(filterBy.title) ||
                        note.isPinned === true && note.info.txt && note.info.txt.includes(filterBy.title) ||
                        note.isPinned === true && note.info.label && note.info.label.includes(filterBy.title) ||
                        note.isPinned === true && note.info.todos && note.info.todos.some(todo => todo.txt.includes(filterBy.title))
                })];
            });
        case 'all':
            if (!filterBy || filterBy.title === null) return gNotes.then(notes => [...notes]);
            return gNotes.then(notes => {
                return [...notes.filter(note => {
                    return note.info.title && note.info.title.includes(filterBy.title) ||
                        note.info.txt && note.info.txt.includes(filterBy.title) ||
                        note.info.label && note.info.label.includes(filterBy.title) ||
                        note.info.todos && note.info.todos.some(todo => todo.txt.includes(filterBy.title))
                })];
            });
    }
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
            title: val
        },
        style: {
            backgroundColor: "#00d"
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
        },
        style: {
            backgroundColor: "#00d"
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
            title: 'New Video',
            url: url
        },
        style: {
            backgroundColor: "#00d"
        }
    }
}
function deleteNote(delNote) {
    let newNotes = gNotes.then(notes => notes.filter(note => note.id !== delNote.id));
    gNotes = newNotes.then(res => [...res]);
    gNotes.then(notes => storageService.store('notes', notes));
    return Promise.resolve();
}

function deleteTodo(selectedNote, delTodoIdx) {
    gNotes = gNotes.then(notes => notes.filter(note => {
        if (note.id === selectedNote.id) {
            note.info.todos = note.info.todos.filter((todo, i) => i !== delTodoIdx);
            return note;
        }
        return note;
    }));
    gNotes.then(notes => storageService.store('notes', notes));
    return Promise.resolve();
}

function updateNote(updateNote, val) {
    switch (updateNote.type) {
        case 'NoteImg':
        case 'NoteVideo':
        case 'NoteText':
            gNotes = gNotes.then(notes => {
                return notes.map(note => {
                    if (note.id === updateNote.id) {
                        note.info.title = val;
                        return note;
                    }
                    return note;
                });
            });
            break;
        case 'NoteTodos':
            gNotes = gNotes.then(notes => {
                return notes.map(note => {
                    if (note.id === updateNote.id) {
                        let label = val.label;
                        note.info.label = label;
                        for (let todo in val.todos) {
                            let idx = getTodosIdx(todo);
                            let txt = val.todos[todo];
                            note.info.todos[idx].txt = txt;
                            note.info.todos[idx].doneAt = Date.now();
                        };
                        return note;
                    }
                    return note;
                });
            });
            break;
        default:
            return 'Wrong format';
    }
    gNotes.then(notes => storageService.store('notes', notes));
    return Promise.resolve();
}


function getTodosIdx(todo) {
    return +todo.substring(4);
}

function notePinToggler(pinNote) {
    gNotes = gNotes.then(notes => {
        return notes.map(note => {
            if (note.id === pinNote.id) {
                note.isPinned = !note.isPinned;
                return note;
            }
            return note;
        });
    });
    return Promise.resolve();
}

function changeNoteBgc(updateNote, color) {
    gNotes = gNotes.then(notes => {
        return notes.map(note => {
            if (note.id === updateNote.id) {
                note.style.backgroundColor = color;
                return note;
            }
            return note;
        });
    });
    return Promise.resolve();
}
