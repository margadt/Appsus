import { formatDate } from '../services/eMailUtils.js'

export default class EmailPreview extends React.Component {

    render() {
        const { props } = this;
        return <React.Fragment>
            <div>
                <span>Subject: {props.eMail.subject}</span>
                <span>{formatDate(props.eMail.sentAt)}</span>
            </div>
        </React.Fragment>
    }
}