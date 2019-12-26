import storageService from "../../../services/storageService.js"
import { getRandomId } from "../../../services/utils.js"

export default { getEmails, getEmailById, getNewId, eMailRead, eMailSend, getUnreadEmailsCount, markAsUnread };

const eMailKey = 'eMails'
let gEmails = storageService.load(eMailKey) || createEmails();

function getEmails(filterBy) {
    const mails = (filterBy.isRead === '') ? [...gEmails] :
        gEmails.filter(mail => { return mail.isRead === JSON.parse(filterBy.isRead)} );
    return Promise.resolve(mails);
}

function getEmailById(id) {
    const eMail = gEmails.find(gEmail => gEmail.id === id);
    return Promise.resolve(eMail);
}

function findEmailIndex(id) {
    return gEmails.findIndex(gEmail => gEmail.id === id);
}

function eMailRead(id) {
    let idx = findEmailIndex(id);
    gEmails[idx].isRead = true;
    storageService.store(eMailKey, gEmails);
    return gEmails;
}

function markAsUnread(id) {
    let idx = findEmailIndex(id);
    gEmails[idx].isRead = false;
    storageService.store(eMailKey, gEmails);
    return gEmails;
}

function getNewId(id, diff) {
    let idx = findEmailIndex(id);
    idx += diff;
    if(idx < 0) idx = gEmails.length-1;
    if(idx > gEmails.length-1) idx = 0;
    return gEmails[idx].id;
}

function eMailSend(eMail) {
    gEmails = [eMail, ...gEmails];
    storageService.store(eMailKey, gEmails);
    return Promise.resolve();
}

function getUnreadEmailsCount() {
    let counter = 0;
    gEmails.forEach(gEmail => {
        if (gEmail.isRead === false) counter++
    });
    if (counter === 0) return '';
    return counter;
}

function createEmails() {
    const eMails = [
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