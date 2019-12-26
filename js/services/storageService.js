export default { store, load, loadPromise }

function store(key, any) {
    console.log('stored');

    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    let str = localStorage[key] || 'null';
    return JSON.parse(str);
}

function loadPromise(key) {
    let str = localStorage[key] || 'null';

    if (str) {
        return Promise.resolve(JSON.parse(str));
    } else {
        return Promise.resolve(null);
    }
}


