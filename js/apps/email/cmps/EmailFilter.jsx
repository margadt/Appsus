import eMailService from '../services/eMailService.js'

const { Link } = ReactRouterDOM;

export default class EmailFilter extends React.Component {

    changeInput = (filter) => {
        this.props.onSetFilter(filter);
    }

    render() {
        return <React.Fragment>
            <div className="mail-filter-container">
                <Link to={'/email/'}><div className="pointer" onClick={() => this.changeInput('')}>Inbox {eMailService.getUnreadEmailsCount()}</div></Link>
                <Link to={'/email/'}><div className="pointer" onClick={() => this.changeInput('isRead')}>Unread Messages</div></Link>
                <Link to={'/email/'}><div className="pointer" onClick={() => this.changeInput('isImportant')}>important {eMailService.getImportantEmailsCount()}</div></Link>
                <Link to={'/email/'}><div className="pointer" onClick={() => this.changeInput('isSent')}>Sent Mail</div></Link>
            </div>
        </React.Fragment >
    }
}