import { formatDate } from '../services/eMailUtils.js'

export default class EmailDetails extends React.Component {

    render() {
        return <React.Fragment>
            <div>
                <div>Subject: {this.props.eMail.Subject}</div>
                <div>{formatDate(this.props.eMail.sentAt)}</div>
                <div>{this.props.eMail.body}</div>
            </div>
        </React.Fragment>
    }
}