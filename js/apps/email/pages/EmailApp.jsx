import eMailService from '../services/eMailService.js'
import EmailStatus from '../cmps/EmailStatus.jsx'
import EmailFilter from '../cmps/EmailFilter.jsx'
import EmailList from '../cmps/EmailList.jsx'
import eventBusService from '../../../services/eventBusService.js'

export default class EmailApp extends React.Component {

    eventKiller = null;

    state = {
        eMails: [],
        filterBy: {
            isRead: ''
        }
    }

    componentDidMount() {
        this.loadEmails();
        this.eventKiller = eventBusService.on('loadEmails', () => {
            this.loadEmails();
        })
    }

    componentWillUnmount() {
        this.eventKiller && this.eventKiller();
    }

    loadEmails = () => {
        eMailService.getEmails(this.state.filterBy).then(eMails => {
            this.setState({ eMails });
        })
    }

    onSetFilter = (filterBy) => {
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, ...filterBy } }), this.loadEmails);
    }

    onCompose = () => {
        eventBusService.emit('toggle', true);
    }

    render() {
        return <React.Fragment>
            <div className="main-container grid">
                <div className="email-nav-bar flex column">
                    <div className="compose-button pointer" onClick={this.onCompose}>Compose +</div>
                    <EmailFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                    <EmailStatus />
                </div>
                <EmailList eMails={this.state.eMails} />
            </div>
        </React.Fragment>
    }
}