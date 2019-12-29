import { getRandomId } from '../../../services/utils.js'

export default function getDefaultNotes() {
    return Promise.resolve([
        {
            id: getRandomId(),
            type: "NoteText",
            isPinned: true,
            info: {
                title: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: getRandomId(),
            type: "NoteImg",
            isPinned: true,
            info: {
                url: "https://i.kym-cdn.com/entries/icons/facebook/000/028/367/cover1.jpg",
                title: "me n da bois bak then"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: getRandomId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://pps.whatsapp.net/v/t61.24694-24/75236151_171082370774171_2842584514200215724_n.jpg?oe=5E089A75&oh=b3b658f57eecb4ae461395dc01683043",
                title: "me n da bois now"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: getRandomId(),
            type: "NoteVideo",
            isPinned: false,
            info: {
                url: "https://www.youtube.com/embed/lFGnsdV-sR4",
                title: "poppinn"
            },
            style: {
                backgroundColor: "yellow"
            }
        },
        {
            id: getRandomId(),
            type: "NoteTodos",
            isPinned: true,
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: "yellow"
            }
        }
    ]);
}