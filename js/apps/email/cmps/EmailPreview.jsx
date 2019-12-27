import { formatDate } from '../services/eMailUtils.js'
import eMailService from '../services/eMailService.js'

const { Link } = ReactRouterDOM;

export default class EmailPreview extends React.Component {

    isUnread = () => {
        const unread = this.props.eMail.isRead;
        return (!unread) ? 'unread' : '';
    }

    onMarkAsUnread = (event) => {
        event.preventDefault();
        let id = event.target.id;
        this.props.onMarkAsUnread(id);
    }

    onMarkAsRead = (event) => {
        event.preventDefault();
        let id = event.target.id;
        this.props.onMarkAsRead(id);
    }

    onDelete = (event) => {
        event.preventDefault();
        let id = event.target.id;
        this.props.onDelete(id);
    } 

    onImportant = (event) => {
        event.preventDefault();
        let id = event.target.id;
        this.props.onImportant(id);
    }
    
    render() {
        const { props } = this;
        return <React.Fragment>
            <div className={` email-preview-container flex column ${this.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${props.eMail.id}`}>
                    <button onClick={this.onImportant} id={props.eMail.id}>star</button>
                    <span className="subject">Subject: {props.eMail.subject} </span>
                    <button onClick={this.onMarkAsUnread} id={props.eMail.id}>Mark as Unread</button>
                    <button onClick={this.onMarkAsRead} id={props.eMail.id}>Mark as Read</button>
                    <button onClick={this.onDelete} id={props.eMail.id}>Delete</button>
                    <span className="received">{formatDate(props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}