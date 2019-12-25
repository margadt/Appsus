import { formatDate } from '../services/eMailUtils.js'

const { Link } = ReactRouterDOM;

export default class EmailPreview extends React.Component {

    render() {
        const { props } = this;
        return <Link to={`/email/${props.eMail.id}`}><React.Fragment>
            <div>
                <span>Subject: {props.eMail.subject} </span>
                <span>{formatDate(props.eMail.sentAt)}</span>
            </div>
        </React.Fragment>
        </Link>
    }
}