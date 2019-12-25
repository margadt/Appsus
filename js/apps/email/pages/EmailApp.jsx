import eMailService from '../services/eMailService.js'
import EmailStatus from '../cmps/EmailStatus.jsx'
import EmailFilter from '../cmps/EmailFilter.jsx'
import EmailCompose from '../cmps/EmailCompose.jsx'
import EmailList from '../cmps/EmailList.jsx'

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

    loadEmails = () => {
        eMailService.getEmails().then(eMails => {
            this.setState({ eMails });
        })
    }

    render() {
        return <React.Fragment>
            <div className="main-container grid">
                <div className="email-nav-bar flex column">
                    <EmailCompose />
                    <EmailFilter />
                    <EmailStatus />
                </div>
                <EmailList eMails={this.state.eMails}/>
            </div>
        </React.Fragment>
    }
}