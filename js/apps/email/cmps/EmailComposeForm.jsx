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
            <form className="flex column center align-center">
            <div className="pointer" onClick={this.closeEmailMessage}>x</div>
                <input type="text" placeholder="To" name="to" onChange={this.inputChange} value={this.state.eMail.to}></input>
                <input type="text" placeholder="Subject" name="subject" onChange={this.inputChange} value={this.state.eMail.subject}></input>
                <textarea rows="20" cols="30" placeholder="Type your message" name="body" onChange={this.inputChange} value={this.state.eMail.body}></textarea>
                <button onClick={this.onEmailSend}>Send</button>
            </form>
        </div>
    }
}