import Books from '../data/data-books.js';
import storageService from '../../../services/storageService.js';
export { getBooks, getBookById, addReview, deleteReview, addBook, getNewId };

let gBooks = storageService.load('books') || Books();

function getBooks(filterBy) {
    if (!filterBy) {
        return Promise.resolve([...gBooks]);
    } else {
        let filteredBooks = gBooks.filter(book => book.title.includes(filterBy.title) && book.listPrice.amount < filterBy.price);
        return Promise.resolve(filteredBooks);
    }
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    return Promise.resolve(book);
}

function addReview(bookId, review) {
    let editBook = gBooks.find(book => book.id === bookId);
    editBook = { ...editBook };
    // editBook.reviews = [...editBook.reviews, review];

    if (!editBook.reviews) editBook.reviews = [];
    editBook.reviews.push(review);
    gBooks = gBooks.map(book => editBook.id === book.id ? editBook : book);
    storageService.store('books', gBooks);

    return Promise.resolve(editBook);
}

function deleteReview(book, reviewIdx) {
    let reviewDltBookIdx = getBookIdxById(book.id);

    gBooks[reviewDltBookIdx].reviews.splice(reviewIdx, 1);
    storageService.store('books', gBooks);
    return Promise.resolve();
}

// function getReviewById(book, reviewId) {
//     return book.reviews.findIndex(review => review.id === reviewId);
// }

function getBookIdxById(bookId) {
    return gBooks.findIndex(book => book.id === bookId);
}

function addBook(book) {
    const newBook = formatBook(book);

    gBooks = [...gBooks, newBook];
    storageService.store('books', gBooks);
    return Promise.resolve(newBook.id);
}

function getNewId(id, diff) {
    let idx = getBookIdxById(id)
    idx += diff;
    if (idx < 0) idx = gBooks.length-1;
    if (idx > gBooks.length-1) idx = 0;
    return gBooks[idx].id;
  }

function formatBook(book) {
    return {
        id: book.id,
        title: book.volumeInfo.title ? book.volumeInfo.title : 'Not available',
        subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : 'Not available',
        authors: [...book.volumeInfo.authors],
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description ? book.volumeInfo.description : 'Not available',
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories ? [...book.volumeInfo.categories] : 'Not available',
        thumbnail: book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail : '',
        language: book.volumeInfo.language,
        listPrice: {
            amount: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Not available',
            currencyCode: book.saleInfo.listPrice ? book.saleInfo.listPrice.currencyCode : 'Not available',
            isOnSale: false
        },
        reviews: []
    }
}

