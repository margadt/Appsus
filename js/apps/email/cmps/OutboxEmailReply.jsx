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
            <form className="flex column" onSubmit={this.onReplySend}>
                <div className='reply-container flex column'>
                    <div className='flex flex-end'>
                        <i className="far fa-times-circle pointer close-button" onClick={this.props.onReply}></i>
                    </div>
                    <div className='to-reply-container'>To:
                    <input className="to-reply" type='text' name='to' defaultValue={this.props.eMail.to}
                            onChange={this.inputChange}></input>
                    </div>
                    <div className='subject-container'>
                        <input className="subject-reply" type='text' name='subject' defaultValue={`re: ${this.props.eMail.subject}`}
                            onChange={this.inputChange}></input>
                    </div>
                    <div>
                        <textarea className='reply-body' rows='7' name='body' defaultValue={this.props.eMail.body}
                            onChange={this.inputChange}></textarea>
                    </div>
                    <div className='footer-reply flex flex-end align-center'>
                        <button className="send-button">Send</button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    }

}