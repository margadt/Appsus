import storageService from "../../../services/storageService.js"
import { getRandomId } from "../../../services/utils.js"

export default {
    getEmails, getEmailById, getNewId, markAsRead, eMailSend,
    getUnreadEmailsCount, markAsUnread, deleteEmail, toggleImportant,
    getImportantEmailsCount, getEmailPercentageRead
};

const eMailKey = 'eMails'
let gEmails = storageService.load(eMailKey) || createEmails();

function getEmails(filterBy) {
    let mails = [];
    switch (true) {
        case (filterBy === ''): {
            mails = [...gEmails];
            break;
        }
        case (filterBy === 'isRead'): {
            mails = gEmails.filter(gEmail => (!gEmail.isRead));
            break;
        }
        case (filterBy === 'isImportant'): {
            mails = gEmails.filter(gEmail => (gEmail.isImportant));
            break;
        }
        case (filterBy === 'isSent'): {
            mails = gEmails.filter(gEmail => (gEmail.isSent));
        }
    }
    return Promise.resolve(mails);
}

function getEmailById(id) {
    const eMail = gEmails.find(gEmail => gEmail.id === id);
    return Promise.resolve(eMail);
}

function findEmailIndex(id) {
    return gEmails.findIndex(gEmail => gEmail.id === id);
}

function markAsRead(id) {
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

function deleteEmail(id) {
    gEmails = gEmails.filter(gEmail => gEmail.id !== id);
    storageService.store(eMailKey, gEmails);
    return gEmails;
}

function toggleImportant(id) {
    let idx = findEmailIndex(id);
    gEmails[idx].isImportant = !gEmails[idx].isImportant;
    storageService.store(eMailKey, gEmails);
    return gEmails;
}

function getNewId(id, diff) {
    let idx = findEmailIndex(id);
    idx += diff;
    if (idx < 0) idx = gEmails.length - 1;
    if (idx > gEmails.length - 1) idx = 0;
    return gEmails[idx].id;
}

function eMailSend(eMail) {
    gEmails = [eMail, ...gEmails];
    storageService.store(eMailKey, gEmails);
    return Promise.resolve();
}

function getUnreadEmailsCount() {
    let counter = gEmails.reduce((acc, email) => {
        if (email.isRead === false) acc++;
        return acc;
    }, 0);
    return (counter) ? counter : '';
}

function getImportantEmailsCount() {
    let counter = gEmails.reduce((acc, email) => {
        if (email.isImportant === true) acc++;
        return acc;
    }, 0);
    return (counter) ? counter : '';
}

function getEmailPercentageRead() {
    let unreadMails = getUnreadEmailsCount();
    let eMailPercentageRead = ((unreadMails / gEmails.length) * 100);
    return eMailPercentageRead;
}

function createEmails() {
    const eMails = [
        {
            id: getRandomId(),
            subject: 'Hello',
            body: 'Is it me you\'re looking for?',
            isRead: false,
            isImportant: false,
            sentAt: 1577269608218
        },
        {
            id: getRandomId(),
            subject: 'Cause I wonder',
            body: 'where you are?',
            isRead: false,
            isImportant: false,
            sentAt: 1577183208218
        },
        {
            id: getRandomId(),
            subject: 'And I wonder',
            body: 'What you do',
            isRead: false,
            isImportant: false,
            sentAt: 1545556808218
        }
    ]

    storageService.store(eMailKey, eMails);
    return eMails;
}