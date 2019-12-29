import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class Outbox extends React.Component {
    render() {
        return <React.Fragment>
            <div className={` email-preview-container row dynamic-comp flex column ${this.props.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${this.props.eMail.id}`}>
                    <div className="icon-container"><i onClick={this.props.onImportant} id={this.props.eMail.id} className={this.props.isItImportant()}></i></div>
                    <span className="from-preview">{this.props.eMail.to} </span>
                    <span className="subject-preview">{this.props.formatSubject()} </span>
                    <div className="icons-container-preview flex flex-end">
                        <div className="icon-container"><i onClick={this.props.onToggleMarkAsRead} id={this.props.eMail.id} className={this.props.isItReadOrUnread()}></i></div>
                        <div className="icon-container"><i className="far fa-trash-alt" onClick={this.props.onDelete} id={this.props.eMail.id}></i></div>
                    </div>
                    <span className="received">{formatDate(this.props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}