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
            mails = mails.filter(mail => (!mail.isSent))
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
    let unreadMails = gEmails.filter(gEmail => (!gEmail.isSent))
    let counter = unreadMails.reduce((acc, email) => {
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
            from: 'John Smith',
            fromEmail: 'johnsmith@gmail.com',
            subject: 'Hello',
            body: 'Is it me you\'re looking for?',
            isRead: false,
            isImportant: false,
            sentAt: 1577269608218
        },
        {
            id: getRandomId(),
            from: 'Calvin Allen',
            fromEmail: 'calvinallen@gmail.com',
            subject: 'JavaScript Tutorial for Beginners: Learn Javascript in 5 Days',
            body: 'JavaScript is an open source & most popular client side scripting language supported by all browsers. JavaScript is used mainly for enhancing the interaction of a user with the webpage. This online guide is geared to make you a JavaScript pro!',
            isRead: false,
            isImportant: false,
            sentAt: 1577183208218
        },
        {
            id: getRandomId(),
            from: 'Ishmael Day',
            fromEmail: 'ishday@gmail.com',
            subject: 'Yo bro! Where you at?!',
            body: 'Are sentiments apartments decisively the especially alteration. Thrown shy denote ten ladies though ask saw. Or by to he going think order event music. Incommode so intention defective at convinced. Led income months itself and houses you. After nor you leave might share court balls. ',
            isRead: false,
            isImportant: false,
            sentAt: 1551281644841
        },
        {
            id: getRandomId(),
            from: 'Xanthus Lynch',
            fromEmail: 'xanthus@gmail.com',
            subject: 'About Last Night.....',
            body: 'Started several mistake joy say painful removed reached end. State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. An course regard to up he hardly. View four has said does men saw find dear shy. Talent men wicket add garden. ',
            isRead: false,
            isImportant: false,
            sentAt: 1547487249809
        },
        {
            id: getRandomId(),
            from: 'Hashim Roberson',
            fromEmail: 'hashrob@gmail.com',
            subject: 'Ci Vediamo!!!!!',
            body: 'Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few immediate sweetness earnestly dejection.',
            isRead: false,
            isImportant: false,
            sentAt: 1572739532840
        },
        {
            id: getRandomId(),
            from: 'Chandler Lindsay',
            fromEmail: 'chnlind@gmail.com',
            subject: 'Another One Bites The Dust',
            body: 'Death weeks early had their and folly timed put. Hearted forbade on an village ye in fifteen. Age attended betrayed her man raptures laughter. Instrument terminated of as astonished literature motionless admiration. The affection are determine how performed intention discourse but. On merits on so valley indeed assure of. Has add particular boisterous uncommonly are. Early wrong as so manor match. Him necessary shameless discovery consulted one but. ',
            isRead: false,
            isImportant: false,
            sentAt: 1570225796355
        },
        {
            id: getRandomId(),
            from: 'Lillith May',
            fromEmail: 'lilmay@gmail.com',
            subject: 'Coming Friday, December 6th... The Confession Killer',
            body: 'Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited. Enquire ye without it garrets up himself. Interest our nor received followed was. Cultivated an up solicitude mr unpleasant. ',
            isRead: false,
            isImportant: false,
            sentAt: 1560947970826
        },
        {
            id: getRandomId(),
            from: 'Blossom Gallegos',
            fromEmail: 'blossom@gmail.com',
            subject: 'Content Editor at Wazimo and 3 other jobs for you.',
            body: 'Agreed joy vanity regret met may ladies oppose who. Mile fail as left as hard eyes. Meet made call in mean four year it to. Prospect so branched wondered sensible of up. For gay consisted resolving pronounce sportsman saw discovery not. Northward or household as conveying we earnestly believing. No in up contrasted discretion inhabiting excellence. Entreaties we collecting unpleasant at everything conviction.',
            isRead: false,
            isImportant: false,
            sentAt: 1564523897321
        },
        {
            id: getRandomId(),
            from: 'Yoshio Cortez',
            fromEmail: 'yoshioCo@gmail.com',
            subject: 'Stop Using For Loops to Iterate Over Arrays | Jonathan Hsu in Better Programming',
            body: 'Had strictly mrs handsome mistaken cheerful. We it so if resolution invitation remarkably unpleasant conviction. As into ye then form. To easy five less if rose were. Now set offended own out required entirely. Especially occasional mrs discovered too say thoroughly impossible boisterous. My head when real no he high rich at with. After so power of young as. Bore year does has get long fat cold saw neat. Put boy carried chiefly shy general',
            isRead: false,
            isImportant: false,
            sentAt: 1564644651391
        },
        {
            id: getRandomId(),
            from: 'Elton Howard',
            fromEmail: 'elthow@gmail.com',
            subject: 'Javascript in italiano',
            body: 'Po ha repentina vertigine narcotico al piuttosto di. Raccogli indietro crudelta ero mantenga cui. Talune ha ho laggiu guardo di vi vedrei. Nel lei partirmi puo cipressi entrambi. Bevuto levato sabato so il chiama dicevi. Esemplare dal inasprite era riconobbi portarono mia distrugge abbassero. ',
            isRead: false,
            isImportant: false,
            sentAt: 1564371308200
        },
        {
            id: getRandomId(),
            from: 'Keegan Dunlap',
            fromEmail: 'keedun@gmail.com',
            subject: 'Don\'t forget to sleep sometimes!',
            body: 'For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer. ',
            isRead: false,
            isImportant: false,
            sentAt: 1519304710934
        },
        {
            id: getRandomId(),
            from: 'Howard Stephens',
            fromEmail: 'howsteph@gmail.com',
            subject: 'Remember the 80\'s?!',
            body: 'Instrument cultivated alteration any favourable expression law far nor. Both new like tore but year. An from mean on with when sing pain. Oh to as principles devonshire companions unsatiable an delightful. The ourselves suffering the sincerity. Inhabit her manners adapted age certain. Debating offended at branched striking be subjects.',
            isRead: false,
            isImportant: false,
            sentAt: 1496477852477
        },
        {
            id: getRandomId(),
            from: 'Gannon Briggs',
            fromEmail: 'gabriggs@gmail.com',
            subject: 'yyyyooooooo bro\'!!!!',
            body: 'Civility vicinity graceful is it at. Improve up at to on mention perhaps raising. Way building not get formerly her peculiar. Up uncommonly prosperous sentiments simplicity acceptance to so. Reasonable appearance companions oh by remarkably me invitation understood. Pursuit elderly ask perhaps all. ',
            isRead: false,
            isImportant: false,
            sentAt: 1532223533042
        },
        {
            id: getRandomId(),
            from: 'Erasmus Barker',
            fromEmail: 'erasbark@gmail.com',
            subject: 'Come and visit cyprus!',
            body: 'Gay one the what walk then she. Demesne mention promise you justice arrived way. Or increasing to in especially inquietude companions acceptance admiration. Outweigh it families distance wandered ye an. Mr unsatiable at literature connection favourable. We neglected mr perfectly continual dependent. ',
            isRead: false,
            isImportant: false,
            sentAt: 1496477852477
        },
        {
            id: getRandomId(),
            from: 'Igor Watts',
            fromEmail: 'iiiggor@gmail.com',
            subject: 'You gotta see this!',
            body: 'One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should',
            isRead: false,
            isImportant: false,
            sentAt: 1549525701967
        },
        {
            id: getRandomId(),
            from: 'Hammett Bryant',
            fromEmail: 'hbryant@gmail.com',
            subject: 'Ladies others the six desire age',
            body: 'Bred am soon park past read by lain. As excuse eldest no moment. An delight beloved up garrets am cottage private. The far attachment discovered celebrated decisively surrounded for and. Sir new the particular frequently indulgence excellence how',
            isRead: false,
            isImportant: false,
            sentAt: 1456138165302
        },
        {
            id: getRandomId(),
            from: 'Madonna Warren',
            fromEmail: 'madwarren@gmail.com',
            subject: 'Textarea Tricks',
            body: 'You can add a background-image to a textarea like you can any other element. In this case, the image is a friendly reminder to be nice =). If you add a background image, for whatever reason, it can break the browser default styling of the textarea. The default 1px solid bolder is replaced with a thicker beveled border. To restore the browser default, you can just force the border back to normal',
            isRead: false,
            isImportant: false,
            sentAt: 1529386778276
        },
        {
            id: getRandomId(),
            from: 'Kelly Summers',
            fromEmail: 'ksummers@gmail.com',
            subject: 'Why I stopped using react and jumped off the window',
            body: 'Barton did feebly change man she afford square add. Want eyes by neat so just must. Past draw tall up face show rent oh mr. Required is debating extended wondered as do. New get described applauded incommode shameless out extremity but. Resembled at perpetual no believing is otherwise sportsman. Is do he dispatched cultivated travelling astonished. Melancholy am considered possession on collecting everything',
            isRead: false,
            isImportant: false,
            sentAt: 1536162261471
        },
        {
            id: getRandomId(),
            from: 'Fatima Harrison',
            fromEmail: 'fatharr@gmail.com',
            subject: 'About the Cypress Hill concert',
            body: 'Greatly hearted has who believe. Drift allow green son walls years for blush. Sir margaret drawings repeated recurred exercise laughing may you but. Do repeated whatever to welcomed absolute no. Fat surprise although outlived and informed shy dissuade property',
            isRead: false,
            isImportant: false,
            sentAt: 1557814117889
        },
    ]

    storageService.store(eMailKey, eMails);
    return eMails;
}