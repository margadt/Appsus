import Inbox from '../cmps/Inbox.jsx'
import Outbox from '../cmps/Outbox.jsx'

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
            {(this.props.filterBy === 'sent') ? 
                <Outbox isUnread={this.isUnread} onToggleMarkAsRead={this.onToggleMarkAsRead} onDelete={this.onDelete} onImportant={this.onImportant}
                       isItReadOrUnread={this.isItReadOrUnread} isItImportant={this.isItImportant} formatSubject={this.formatSubject} eMail={this.props.eMail}/> : 
                <Inbox isUnread={this.isUnread} onToggleMarkAsRead={this.onToggleMarkAsRead} onDelete={this.onDelete} onImportant={this.onImportant}
                       isItReadOrUnread={this.isItReadOrUnread} isItImportant={this.isItImportant} formatSubject={this.formatSubject} eMail={this.props.eMail}/>}
        </React.Fragment>
    }
}