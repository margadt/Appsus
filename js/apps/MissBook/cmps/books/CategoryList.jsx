export default function CategoryList(props) {
    if (props.book.categories.length > 1 && Array.isArray(props.book.categories)) {
        let str = props.book.categories.join(', ') + '.';
        return str;
    } else {
        return props.book.categories[0];
    }
}