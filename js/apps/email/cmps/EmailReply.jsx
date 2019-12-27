import { getRandomId } from "../../../services/utils.js"
import eMailService from '../services/eMailService.js'

export default class EmailReply extends React.Component {

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
        const field = event.target.id;
        const value = event.target.innerHTML;
        console.log(field, value);
        this.setState({eMail: {[field]: value }})
    }

    onEventStopPropagation = (event) => {
        event.stopPropagation();
    }

    onReplySend = (event) => {
        event.preventDefault();
        eMailService.eMailSend(this.state.eMail).then(() => {
        this.props.OnReply;});
    }

    render() {
        return <React.Fragment>
            <div>To:</div><div contentEditable='true' suppressContentEditableWarning={true} id='to'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>{this.props.eMail.to}</div>
            <div contentEditable='true' suppressContentEditableWarning={true} id='subject'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>Re: {this.props.eMail.subject}</div>
            <div contentEditable='true' suppressContentEditableWarning={true} id='body'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>{this.props.eMail.body}</div>
            <button onClick={this.onReplySend}>Send</button>
        </React.Fragment>
    }

}

            {/* <div>To:</div><div contentEditable='true' suppressContentEditableWarning={true} id='to'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>{this.props.eMail.to}</div>
            <div contentEditable='true' suppressContentEditableWarning={true} id='subject'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>Re: {this.props.eMail.subject}</div>
            <div contentEditable='true' suppressContentEditableWarning={true} id='body'
                 onClick={this.onEventStopPropagation} onInput={this.inputChange}>{this.props.eMail.body}</div> */}