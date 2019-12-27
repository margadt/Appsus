export {formatDate, formatDateEmailDetails};

function formatDate(date) {

    let dateObject;
    let currDate = Date.now();
    const startOfDay = new Date(currDate).setHours(0, 0, 0, 0);
    if (currDate - date >= 3.154e+10) {
        dateObject = new Date(date).toLocaleString().substring(0,10);
    } else if (date < startOfDay) {
        dateObject = new Date(date).toString().substring(4,10);
    } else {
        dateObject = new Date(date).toTimeString().substring(0,5);
    }
    return dateObject;
}

function formatDateEmailDetails(date) {

    let dateObject;
    let currDate = Date.now();
    const startOfDay = new Date(currDate).setHours(0, 0, 0, 0);
    if (currDate - date >= 3.154e+10) {
        dateObject = new Date(date).toLocaleString();
    } else if (date < startOfDay) {
        dateObject = new Date(date).toLocaleString();
    } else {
        dateObject = new Date(date).toTimeString().substring(0,5);
    }
    return dateObject;
}