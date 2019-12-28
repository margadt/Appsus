import storageService from "../../../services/storageService.js"
import { getRandomId } from "../../../services/utils.js"

export default {
    getEmails, getEmailById, getNewId, eMailSend, markAsRead,
    getUnreadEmailsCount, toggleMarkAsRead, deleteEmail, toggleImportant,
    getImportantEmailsCount, getEmailPercentageRead
};

const eMailKey = 'eMails';
let gEmails = storageService.load(eMailKey) || createEmails();

function getEmails(filterBy, searchText, currSortBy, prevSortBy) {
    let mails = searchEmail(searchText);
    switch (true) {
        case (filterBy === ''): {
            break;
        }
        case (filterBy === 'isRead'): {
            mails = mails.filter(mail => (!mail.isRead));
            break;
        }
        case (filterBy === 'isImportant'): {
            mails = mails.filter(mail => (mail.isImportant));
            break;
        }
        case (filterBy === 'isSent'): {
            mails = mails.filter(mail => (mail.isSent));
        }
    }
    mails = sortEmails(mails, currSortBy, prevSortBy);
    return Promise.resolve(mails);
}

function searchEmail(searchText) {
    const mails = [...gEmails];
    if (searchText === '') {
        return mails
    } else {
        return mails.filter(mail => mail.subject.toLowerCase().includes(searchText.toLowerCase()));
    }
}

function sortEmails(mails, currSortBy, prevSortBy) {
    console.log('mails: ', mails);
    if (currSortBy === 'subject') {
        mails = mails.sort((eMail1, eMail2) => {
            let result = (eMail1[currSortBy].toLowerCase() > eMail2[currSortBy].toLowerCase()) ? -1 : (eMail1[currSortBy].toLowerCase() < eMail2[currSortBy].toLowerCase()) ? 1 : 0;
            return result;
        });
    } else {
        mails = mails.sort((eMail1, eMail2) => {
            let result = (eMail1[currSortBy] > eMail2[currSortBy]) ? -1 : (eMail1[currSortBy] < eMail2[currSortBy]) ? 1 : 0;
            return result;
        });
    }
    console.log('mails: ', mails);
    console.log('curr: ', currSortBy);
    console.log('prev: ', prevSortBy);

    // console.log('currSortBy: ', currSortBy);
    // console.log('prevSortBy: ', prevSortBy);
    // console.log(mails);
    // if (currSortBy === prevSortBy) {
    //     console.log('reverse');
    //     mails = [...mails.reverse()];
    //     console.log(reversedMails)
    //     return mails;
    // } else {
    //     console.log('notReverse');
    //     return mails;
    // }
    return (currSortBy === prevSortBy) ? mails = [...mails.reverse()] : mails;
}

function getEmailById(id) {
    const eMail = gEmails.find(gEmail => gEmail.id === id);
    return Promise.resolve(eMail);
}

function findEmailIndex(id) {
    return gEmails.findIndex(gEmail => gEmail.id === id);
}

function toggleMarkAsRead(id) {
    let idx = findEmailIndex(id);
    gEmails[idx].isRead = !gEmails[idx].isRead;
    storageService.store(eMailKey, gEmails);
    return gEmails;
}

function markAsRead(id) {
    let idx = findEmailIndex(id);
    gEmails[idx].isRead = true;
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
    let eMailPercentageRead = Math.round((unreadMails / gEmails.length) * 100);
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

// function sortEmails(mails, sortBy) {
//     console.log('before sort', mails);
//     let reversedMails;
//     if (gSort === sortBy) {
//         reversedMails = mails.reverse();
//         gSort = sortBy;
//         console.log('sortBy: ', sortBy);
//         console.log('reverse', mails);
//         return reversedMails;
//     } else {
//         mails.sort((eMail1, eMail2) => {
//             let result = (eMail1[sortBy] > eMail2[sortBy]) ? -1 : (eMail1[sortBy] < eMail2[sortBy]) ? 1 : 0;
//             return result;
//         });
//         gSort = sortBy;
//         console.log('sortBy: ', sortBy);
//         console.log('mails: ', mails);
//         return mails;
//     }
// }