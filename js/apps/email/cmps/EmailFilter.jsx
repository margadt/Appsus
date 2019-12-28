import eMailService from '../services/eMailService.js'

export default class EmailFilter extends React.Component {

    changeInput = (filter) => {
        this.props.onSetFilter(filter);
        this.props.history.push('/email/');
    }

    render() {
        return <React.Fragment>
            <div className="mail-filter-container">
                <div className="pointer" onClick={() => this.changeInput('')}>Inbox {eMailService.getUnreadEmailsCount()}</div>
                <div className="pointer" onClick={() => this.changeInput('isRead')}>Unread Messages</div>
                <div className="pointer" onClick={() => this.changeInput('isImportant')}>important {eMailService.getImportantEmailsCount()}</div>
                <div className="pointer" onClick={() => this.changeInput('isSent')}>Sent Mail</div>
            </div>
        </React.Fragment >
    }
}