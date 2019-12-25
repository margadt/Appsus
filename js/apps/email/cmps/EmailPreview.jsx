import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class EmailPreview extends React.Component {

    isUnread = () => {
        const unread = this.props.eMail.isRead;
        return (!unread) ? 'unread' : '';
    }

    render() {
        const { props } = this;
        return <React.Fragment>
            <div className={` email-preview-container flex column ${this.isUnread()}`}>
                <Link to={`/email/${props.eMail.id}`}>
                    <span className="subject">Subject: {props.eMail.subject} </span>
                    <span className="received">{formatDate(props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}