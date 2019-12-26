import eMailService from '../services/eMailService.js'
import EmailStatus from '../cmps/EmailStatus.jsx'
import EmailFilter from '../cmps/EmailFilter.jsx'
import EmailList from '../cmps/EmailList.jsx'
import eventBusService from '../../../services/eventBusService.js'

export default class EmailApp extends React.Component {

    state = {
        eMails: [],
        filterBy: {
            isRead: false
        }
    }

    componentDidMount() {
        this.loadEmails();
    }

    componentDidUpdate(prevState) {
        if (prevState.eMails !== this.state.eMails) {
            console.log('working');
        }
    }

    loadEmails = () => {
        eMailService.getEmails().then(eMails => {
            this.setState({ eMails });
        })
    }


    onCompose = () => {
        eventBusService.emit('toggle', true);
    }

    render() {
        return <React.Fragment>
            <div className="main-container grid">
                <div className="email-nav-bar flex column">
                    <div className="compose-button pointer" onClick={this.onCompose}>Compose +</div>
                    <EmailFilter />
                    <EmailStatus />
                </div>
                <EmailList eMails={this.state.eMails} />
            </div>
        </React.Fragment>
    }
}