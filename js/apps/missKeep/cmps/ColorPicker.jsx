export default class ColorPicker extends React.Component {

    onChangeBgcColor = () => {
        this.props.onChangeBgcColor(this.props.note, this.props.color);
    }

    render() {
        return <i className={`fas fa-tint pointer ${this.props.color}`} onClick={this.onChangeBgcColor}></i>
    }

}