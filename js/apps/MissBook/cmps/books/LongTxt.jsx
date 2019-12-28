export default function LongText(props) {
    if (props.isLongTxtShown) {
        return props.text + ' ';
    } else if (props.text.length > 100) {
        return props.text.substring(0, 97) + '... ';
    } else {
        return props.text + ' ';
    }
}