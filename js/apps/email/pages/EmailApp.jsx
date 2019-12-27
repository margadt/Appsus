import eMailService from '../services/eMailService.js'
import EmailStatus from '../cmps/EmailStatus.jsx'
import EmailFilter from '../cmps/EmailFilter.jsx'
import EmailList from '../cmps/EmailList.jsx'
import eventBusService from '../../../services/eventBusService.js'

export default class EmailApp extends React.Component {

    eventKiller = null;

    state = {
        eMails: [],
        filterBy: ''
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
            return this.setState({ eMails });
        })
    }

    onSetFilter = (filterBy) => {
        this.setState(({filterBy: filterBy }), this.loadEmails);
    }

    onCompose = () => {
        eventBusService.emit('toggle', true);
    }

    onMarkAsUnread = (id) => {
        eMailService.markAsUnread(id);
        this.loadEmails();
    }

    onMarkAsRead = (id) => {
        eMailService.markAsRead(id);
        this.loadEmails();
    }

    onDelete = (id) => {
        eMailService.deleteEmail(id);
        this.loadEmails();
    }

    onImportant = (id) => {
        eMailService.toggleImportant(id);
        this.loadEmails();
    }

    render() {
        return <React.Fragment>
            <div className="main-container grid">
                <div className="email-nav-bar flex column">
                    <div className="compose-button pointer" onClick={this.onCompose}>Compose +</div>
                    <EmailFilter onSetFilter={this.onSetFilter} />
                    <EmailStatus />
                </div>
                <EmailList eMails={this.state.eMails} onMarkAsUnread={this.onMarkAsUnread} onMarkAsRead={this.onMarkAsRead} 
                           onDelete={this.onDelete} onImportant={this.onImportant}/>
            </div>
        </React.Fragment>
    }
}