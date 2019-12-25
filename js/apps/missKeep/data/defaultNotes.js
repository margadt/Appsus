import { getRandomId } from '../../../services/utils.js'

export default function getDefaultNotes() {
    return Promise.resolve([
        {
            id: getRandomId(),
            type: "NoteText",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: getRandomId(),
            type: "NoteImg",
            info: {
                url: "https://picsum.photos/100",
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: getRandomId(),
            type: "NoteTodos",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            }
        }
    ]);
}