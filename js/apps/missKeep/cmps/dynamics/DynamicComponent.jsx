import mapDynamicComponents from "./mapDynamicComponents.js"

export default class DynamicComponent extends React.Component {
    state = {
        componentType: 'NoteText',
    }

    componentDidMount() {
        this.setState({ componentType: this.props.note.type });
    }

    getComponent() {
        return mapDynamicComponents[this.state.componentType];
    }

    render() {
        const Cmp = this.getComponent();
        return <React.Fragment>
            <Cmp note={this.props.note} onChangeBgcColor={this.props.onChangeBgcColor} updateNote={this.props.updateNote} onNotePinToggler={this.props.onNotePinToggler} onDeleteTodo={this.props.onDeleteTodo} onDeleteNote={this.props.onDeleteNote} ></Cmp>
        </React.Fragment>
    }
}