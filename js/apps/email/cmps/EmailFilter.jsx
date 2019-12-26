import eMailService from '../services/eMailService.js'

export default class EmailFilter extends React.Component {

    changeInput = (event) => {
        let field = (event.target.name);
        let value = (event.target.value);
        this.props.onSetFilter({ [field]: value });
    }

    onShowAll = () => {
        this.props.onSetFilter({ isRead: '' });
    }

    render() {
        return <React.Fragment>
            <div className="mail-filer-container">
                <div className ="pointer" onClick={this.onShowAll}>Inbox {eMailService.getUnreadEmailsCount()}</div>
                <button onClick={this.changeInput} value={false} name='isRead'>Unread Messages</button>
                <div>Sent Mail</div>
            </div>
        </React.Fragment>
    }
}