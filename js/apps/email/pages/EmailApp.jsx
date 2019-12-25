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
        eMailService.getEmails(this.state.filterBy).then(eMails => {
            this.setState({ eMails });
        })
    }

    render() {
        return <React.Fragment>
            <div>
                <EmailStatus />
                <EmailFilter />
                <EmailCompose />
            </div>
            <EmailList eMails={this.state.eMails}/>
        </React.Fragment>
    }
}