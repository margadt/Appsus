import storageService from "../../../services/storageService.js"
import {getRandomId} from "../../../services/utils.js"

export default {getEmails};

const eMailKey = 'eMails'
let gEmails = storageService.load(eMailKey) || createEmails();

function getEmails(filterBy) {
    const mails = (!filterBy) ? [...gEmails] :
    gEmails.filter(mail => {return mail.isRead === filterBy.isRead});
    return Promise.resolve(mails);
}

function createEmails() {
    const eMails =[
        {   
            id: getRandomId(),
            subject: 'Hello',
            body: 'Is it me you\'re looking for?',
            isRead: false,
            sentAt: 1577269608218
        },
        {   
            id: getRandomId(),
            subject: 'Cause I wonder',
            body: 'where you are?',
            isRead: false,
            sentAt: 1577183208218
        },
        {   
            id: getRandomId(),
            subject: 'And I wonder',
            body: 'What you do',
            isRead: false,
            sentAt: 1545556808218
        }
    ]

    storageService.store(eMailKey, eMails);
    return eMails;
}