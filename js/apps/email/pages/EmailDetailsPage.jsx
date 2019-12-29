import eMailService from '../services/eMailService.js'
import InboxEmailDetails from '../cmps/InboxEmailDetails.jsx'
import OutboxEmailDetails from '../cmps/OutboxEmailDetails.jsx'

export default class EmailDetailsPage extends React.Component {
    state = {
        selectedEmail: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        const { id } = this.props.match.params;
        eMailService.markAsRead(id);
        eMailService.getEmailById(id).then(selectedEmail => {
            this.setState({ selectedEmail });
        });
    }

    goBack = () => {
        this.props.history.push('/email');
    }

    changeEmailShown = (diff) => {
        const { id } = this.props.match.params;
        const newId = eMailService.getNewId(id, diff);
        this.props.history.push(`/email/${newId}`);
    }
    
    render() {
        if (!this.state.selectedEmail) {
            return <div>Loading...</div>
        } else if (this.props.filter === 'isSent'){
            return <OutboxEmailDetails eMail={this.state.selectedEmail} goBack={this.goBack} changeEmailShown={this.changeEmailShown}/>
        } else {
            return <InboxEmailDetails eMail={this.state.selectedEmail} goBack={this.goBack} changeEmailShown={this.changeEmailShown}/>
        }
    }
}