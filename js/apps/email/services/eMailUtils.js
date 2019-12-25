export {formatDate};

function formatDate(date) {
    let dateObject;
    let currDate = Date.now();
    if (currDate - date >= 3.154e+10) {
        dateObject = new Date(date).toLocaleString().substring(0,10);
    } else if (currDate - date >= 86400000) {
        dateObject = new Date(date).toString().substring(4,10);
    } else {
        dateObject = new Date(date).toTimeString().substring(0,5);
    }
    return dateObject;
}