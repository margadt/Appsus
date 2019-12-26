import { formatDate } from '../services/eMailUtils.js'

export default class EmailDetails extends React.Component {

    render() {
        return <React.Fragment>
            <div>
                <div className="nav-buttons-container flex align-center">
                    <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(-1)}>Previous</div>
                    <div className="nav-button pointer" onClick={this.props.goBack}>Back To Inbox</div>
                    <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(1)}>Next</div>
                    <div className="nav-button pointer" onClick={this.props.onMarkAsUnread}>Mark as Unread</div>
                </div>
                <div>Subject: {this.props.eMail.subject}</div>
                <div>{formatDate(this.props.eMail.sentAt)}</div>
                <div>{this.props.eMail.body}</div>
            </div>
        </React.Fragment>
    }
}