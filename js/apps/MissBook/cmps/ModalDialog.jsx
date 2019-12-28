import eventBusService from "../services/eventBusService.js";

export default class ModalDialog extends React.Component {
    eventKiller = null;

    state = { display: false, bookName: null }

    componentDidMount() {
        this.eventKiller = eventBusService.on('toggleModal', (bookName) => {
            this.setState(prevState => ({ display: !prevState.display, bookName }))
        })
    }


    componentWillUnmount() {
        this.eventKiller && this.eventKiller();
    }

    render() {
        // case of swal - return null
        if (!this.state.display) return null;
        return <div>Enjoy reading {this.state.bookName}</div>
    }
} 