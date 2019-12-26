import eMailService from '../services/eMailService.js'
import EmailDetails from '../cmps/EmailDetails.jsx'

export default class EmailDetailsPage extends React.Component {
    state = {
        selectedEmail: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    componentDidUpdate() {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        const { id } = this.props.match.params;
        eMailService.eMailRead(id);
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
        if (!this.state.selectedEmail) return <div>Loading...</div>
        return <EmailDetails eMail={this.state.selectedEmail} goBack={this.goBack} changeEmailShown={this.changeEmailShown} />
    }
}