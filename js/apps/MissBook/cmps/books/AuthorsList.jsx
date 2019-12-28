export default function AuthorsList(props) {
    let authors = props.book.authors;
    if(authors > 1){
        authors.split(',');
    }else{
        return authors[0];
    }
    return authors;
}