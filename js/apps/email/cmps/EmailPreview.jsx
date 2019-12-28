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
        const isRead = this.props.eMail.isRead;
        return (isRead) ? 'far fa-envelope' : 'far fa-envelope-open';
    }

    isItImportant = () => {
        const isImportant = this.props.eMail.isImportant;
        return (isImportant) ? 'fas fa-star' : 'far fa-star';
    }

    formatSubject = () => {
        let subject = this.props.eMail.subject;
        let shortSubject = '';
        const textLength = subject.length;
        
        return (textLength < 50) ? subject : shortSubject = subject.substring(0, 45).concat('...');
    }

    render() {
        return <React.Fragment>
            <div className={` email-preview-container row dynamic-comp flex column ${this.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${this.props.eMail.id}`}>
                    <div className="icon-container"><i onClick={this.onImportant} id={this.props.eMail.id} className={this.isItImportant()}></i></div>
                    <span className="from-preview">{this.props.eMail.from} </span>
                    <span className="subject-preview">{this.formatSubject()} </span>
                    <div className="icons-container-preview flex flex-end">
                        <div className="icon-container"><i onClick={this.onToggleMarkAsRead} id={this.props.eMail.id} className={this.isItReadOrUnread()}></i></div>
                        <div className="icon-container"><i className="far fa-trash-alt" onClick={this.onDelete} id={this.props.eMail.id}></i></div>
                    </div>
                    <span className="received">{formatDate(this.props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}