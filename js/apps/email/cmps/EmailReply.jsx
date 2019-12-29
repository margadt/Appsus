import { getRandomId } from "../../../services/utils.js"
import eMailService from '../services/eMailService.js'

export default class EmailReply extends React.Component {

    state = {
        eMail: {
            id: getRandomId(),
            to: this.props.eMail.fromEmail,
            subject: 're: ' + this.props.eMail.subject,
            body: this.props.eMail.body,
            isSent: true,
            sentAt: Date.now()
        }
    }

    inputChange = (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({ eMail: { ...prevState.eMail, [field]: value } }))
    }

    onEventStopPropagation = (event) => {
        event.stopPropagation();
    }

    onReplySend = (event) => {
        event.preventDefault();
        eMailService.eMailSend(this.state.eMail).then(() => {
            this.props.OnReply;
        });
    }

    render() {
        return <React.Fragment>
            <form className="flex column center align-center" onSubmit={this.onReplySend}>
                <div>To:
                    <input type='text' name='to' defaultValue={this.props.eMail.fromEmail}
                           onChange={this.inputChange}></input>
                </div>
                <input type='text' name='subject' defaultValue={`re: ${this.props.eMail.subject}`}
                       onChange={this.inputChange}></input>
                <textarea name='body' defaultValue={this.props.eMail.body}
                       onChange={this.inputChange}></textarea>
                <button>Send</button>
            </form>
        </React.Fragment>
    }

}