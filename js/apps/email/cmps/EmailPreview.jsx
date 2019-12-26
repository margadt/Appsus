import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class EmailPreview extends React.Component {

    isUnread = () => {
        const unread = this.props.eMail.isRead;
        return (!unread) ? 'unread' : '';
    }

    // isChecked = (event) => {
    //     event.stopPropagation();
    //     let id = event.currentTarget.id;
    //     let value = event.target.checked;
    //     this.props.showButtons(value, id);
    //     this.onMarkRead(id);
    // }

    // onMarkRead(id) {
    //     this.props.onMarkRead(id);
    // }

    render() {
        const { props } = this;
        return <React.Fragment>
            <div className={` email-preview-container flex column ${this.isUnread()}`}>
                <Link className="flex space-between" to={`/email/${props.eMail.id}`}>
                    {/* <input className="preview-check" id={props.eMail.id} type="checkbox" onClick={this.isChecked}></input> */}
                    <span className="subject">Subject: {props.eMail.subject} </span>
                    <span className="received">{formatDate(props.eMail.sentAt)}</span>
                </Link>
            </div>
        </React.Fragment>
    }
}