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

    isItReadOrUnread = () => {
        event.preventDefault();
        const isRead = this.props.eMail.isRead;
        return (isRead) ? 'far fa-envelope' : 'far fa-envelope-open';
    }

    isItImportant = (isImportant) => {
        event.preventDefault();
        return (isImportant) ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>;
    }

    render() {
        const { props } = this;
        return <React.Fragment>
            <div className={` email-preview-container dynamic-comp flex column ${this.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${this.props.eMail.id}`}>
                    <button onClick={this.onImportant} id={this.props.eMail.id}>are {this.isItImportant(this.props.eMail.isImportant)}</button>
                    <span className="subject">Subject: {this.props.eMail.subject} </span>
                    {/* <button onClick={this.onToggleMarkAsRead} id={props.eMail.id}>Mark as {this.isItReadOrUnread(props.eMail.isRead)}</button> */}
                    <button onClick={this.onToggleMarkAsRead} id={this.props.eMail.id}>mark as <i className={this.isItReadOrUnread()}></i></button>
                    {/* <div onClick={this.onToggleMarkAsRead} id={this.props.eMail.id}><i className={this.isItReadOrUnread()}></i></div> */}
                    <button onClick={this.onDelete} id={this.props.eMail.id}><i className="far fa-trash-alt"></i></button>
                    <span className="received">{formatDate(this.props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}