import { getRandomId } from "../../../services/utils.js"
import eMailService from '../services/eMailService.js'
import eventBusService from '../../../services/eventBusService.js'

export default class EmailComposeForm extends React.Component {

    state = {
            id: getRandomId(),
            subject: '',
            body: '',
            isRead: false,
            sentAt: Date.now()
    }

    inputChange = (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({prevState, [field]: value }))
    }

    onEmailSend = (event) => {
        event.preventDefault();
        eMailService.eMailSend({ ...this.state }).then(() => {
            eventBusService.emit('toggle', true);
        })
    }


    render() {
        return <div className="compose-email-form">
            <form className="flex column center align-center">
                <input type="text" placeholder="Subject" name="subject" onChange={this.inputChange} value={this.state.subject}></input>
                <textarea rows="20" cols="30" placeholder="Type your message" name="body" onChange={this.inputChange} value={this.state.body}></textarea>
                <button onClick={this.onEmailSend}>Send</button>
            </form>
        </div>
    }
}