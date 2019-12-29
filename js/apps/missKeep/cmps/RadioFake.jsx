export default class RadioFake extends React.Component {

    onSetType = () => {
        this.props.onSetType(this.props.type);
    }

    render() {
        if(this.props.currType === this.props.type){
            return <i className={this.props.fontClass + ' selected-radio'} onClick={this.onSetType}></i>
        }
        return <i className={this.props.fontClass} onClick={this.onSetType}></i>
    }
}