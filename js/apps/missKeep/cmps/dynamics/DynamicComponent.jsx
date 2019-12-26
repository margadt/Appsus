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
            <Cmp note={this.props.note} updateNote={this.props.updateNote} onDeleteNote={this.props.onDeleteNote} onSelectNote={this.props.onSelectNote}></Cmp>
        </React.Fragment>
    }
}