export { setPriceClass, isOnSale, isOnSaleThumbnails, formatCurrency };

function setPriceClass(price) {
    if (price > 150) return 'expensive';
    if (price < 20) return 'cheap';
}

function isOnSale(isBookOnSale) {
    if (isBookOnSale) return './img/sale.png';
}

function isOnSaleThumbnails(isBookOnSale) {
    if (isBookOnSale) return './img/sale_thumbnails.png';
}

function formatCurrency(currency) {
    switch (true) {
        case (currency === 'ILS'):
            return '₪';
        case (currency === 'USD'):
            return '$';
        case (currency === 'EUR'):
            return '‎€';
    }
}