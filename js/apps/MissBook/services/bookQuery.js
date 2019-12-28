export { getQuery }
const url = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=';

function getQuery(query) {
    const queryPrm = axios.get(url + query)
    // queryPrm.then(res => res.data);
    .catch('error')

    return queryPrm;
}