import { getRandomId } from "../../../services/utils.js"
import eMailService from '../services/eMailService.js'
import eventBusService from '../../../services/eventBusService.js'

export default class EmailComposeForm extends React.Component {

    state = {
        eMail: {
            id: getRandomId(),
            to:'',
            subject: '',
            body: '',
            isRead: false,
            isSent: true,
            isImportant: false,
            sentAt: Date.now()
        }
    }

    inputChange = (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({eMail: {...prevState.eMail, [field]: value }}))
    }

    onEmailSend = (event) => {
        event.preventDefault();
        eMailService.eMailSend(this.state.eMail).then(() => {
        eventBusService.emit('toggle', true)});
        eventBusService.emit('loadEmails', true)
    }

    closeEmailMessage = () => {
        eventBusService.emit('toggle', true);  
    }

    render() {
        return <div className="compose-email-form">
            <form className="flex column">
                <div className="message-header flex space-between">New Message
                <i className="far fa-times-circle pointer close-button flex-end" onClick={this.closeEmailMessage}></i>
                </div>
                <input type="text" className="to" placeholder="To" name="to" onChange={this.inputChange} value={this.state.eMail.to}></input>
                <input type="text" className="subject-compose" placeholder="Subject" name="subject" onChange={this.inputChange} value={this.state.eMail.subject}></input>
                <textarea className="body" rows="15" cols="30" placeholder="Type your message" name="body" onChange={this.inputChange} value={this.state.eMail.body}></textarea>
                <div className="message-footer flex flex-end align-center">
                    <button className="send-button" onClick={this.onEmailSend}>Send</button>
                </div>
            </form>
        </div>
    }
}