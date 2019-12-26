import eventBusService from '../../../services/eventBusService.js'
import EmailComposeForm from '../cmps/EmailComposeForm.jsx'

export default class EmailCompose extends React.Component {

    eventKiller = null;

    state = {
        display: false,
    }

    componentDidMount() {
        this.eventKiller = eventBusService.on('toggle', () => {
            this.setState(prevState => ({ display: !prevState.display }))
        })
    }

    componentWillUnmount() {
        this.eventKiller && this.eventKiller();
    }


    render() {
        if (!this.state.display) return null;
        return <EmailComposeForm />
    }
}