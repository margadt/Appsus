import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class Inbox extends React.Component {
    render() {
        return <React.Fragment>
            <div className={` email-preview-container row dynamic-comp flex column ${this.props.isUnread()}`}>
                <Link className="preview-row flex" to={`/email/${this.props.eMail.id}`}>
                    <div className="icon-container"><i onClick={this.props.onImportant} id={this.props.eMail.id} className={this.props.isItImportant()}></i></div>
                    <div className="from-preview">{this.props.eMail.from} </div>
                    <div className="subject-preview">{this.props.formatSubject()} </div>
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