import mapDynamicComponents from "./mapDynamicComponents.js"

export default class DynamicComponent extends React.Component {
    state = {
        componentType: 'NoteText',
    }

    componentDidMount(){
        this.setState({componentType: this.props.note.type});
    }

    getComponent() {
        return mapDynamicComponents[this.state.componentType];
    }

    setComponent = (ev)=>{
        this.setState({componentName: ev.target.value});
    }

    render() {
        const Cmp = this.getComponent();

        return <React.Fragment>
            <Cmp note={this.props.note}></Cmp>
        </React.Fragment>
        // switch (this.state.componentName) {
        //     case 'hello':
        //         return <Hello name={this.state.userName}></Hello>
        //     case 'bye':
        //         return <Bye name={this.state.userName}></Bye>
        //     case 'hello':
        //         return <Welcome name={this.state.userName}></Welcome>
        // }
    }
}