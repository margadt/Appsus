import eMailService from '../services/eMailService.js'

export default class EmailFilter extends React.Component {

    changeInput = (filter) => {
        this.props.onSetFilter(filter);
        this.props.history.push('/email/');
    }

    render() {
        return <React.Fragment>
            <div className="mail-filter-container flex column align-center">
                <div className="pointer inbox-nav-bar" onClick={() => this.changeInput('')}>Inbox {eMailService.getUnreadEmailsCount()}</div>
                <div className="pointer unread-nav-bar" onClick={() => this.changeInput('isRead')}>Unread Messages</div>
                <div className="pointer important-nav-bar" onClick={() => this.changeInput('isImportant')}>Important {eMailService.getImportantEmailsCount()}</div>
                <div className="pointer sent-nav-bar" onClick={() => this.changeInput('isSent')}>Sent Mail</div>
            </div>
        </React.Fragment >
    }
}