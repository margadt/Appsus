import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class EmailPreview extends React.Component {

    isUnread = () => {
        const unread = this.props.eMail.isRead;
        return (!unread) ? 'unread' : '';
    }

    onToggleMarkAsRead = (event) => {
        event.preventDefault();
        let id = event.target.id;
        this.props.onToggleMarkAsRead(id);
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

    isItReadOrUnread = (isRead) => {
       return (isRead) ? 'Unread' : 'Read';
    }
    
    render() {
        const { props } = this;
        return <React.Fragment>
            <div className={` email-preview-container dynamic-comp flex column ${this.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${props.eMail.id}`}>
                    <button onClick={this.onImportant} id={props.eMail.id}>star</button>
                    <span className="subject">Subject: {props.eMail.subject} </span>
                    <button onClick={this.onToggleMarkAsRead} id={props.eMail.id}>Mark as {this.isItReadOrUnread(props.eMail.isRead)}</button>
                    <button onClick={this.onDelete} id={props.eMail.id}>Delete</button>
                    <span className="received">{formatDate(props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}