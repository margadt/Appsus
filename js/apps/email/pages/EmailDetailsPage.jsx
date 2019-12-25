import EmailDetails from '../cmps/EmailDetails.jsx'
import eMailService from '../services/eMailService.js'

export default class EmailDetailsPage extends React.Component {

    state = {
        selectedEmail: null
    }

    componentDidMount() {
        console.log('working');
        this.loadEmail();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        const { id } = this.props.match.params;
        eMailService.getEmailById(id).then(selectedEmail => {
            this.setState({ selectedEmail });
        })
    }

    render() {
        if (!this.state.selectedEmail) return <div>Loading...</div>
        return <EmailDetails eMail={this.state.selectedEmail}/>
    }
}