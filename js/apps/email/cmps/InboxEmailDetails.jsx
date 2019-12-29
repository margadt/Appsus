import { formatDateEmailDetails } from '../services/eMailUtils.js'
import InboxEmailReply from '../cmps/InboxEmailReply.jsx'

export default class InboxEmailDetails extends React.Component {
    
    state = {reply: false}

    onReply = () => {
        this.setState (prevState => ({reply: !prevState.reply}));
    }

    render() {
        return <React.Fragment>
            <div className='dynamic-comp email-details-container'>
                <div className='message-container flex column'>
                    <div className="nav-buttons-container flex">
                        <div className="nav-button pointer" onClick={this.onReply}>Reply</div>
                        <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(-1)}>Previous</div>
                        <div className="nav-button pointer" onClick={this.props.goBack}>Back To Inbox</div>
                        <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(1)}>Next</div>
                    </div>
                    <div className='email-details-container flex column'>
                        <div>From: {this.props.eMail.from} ( <small>{this.props.eMail.fromEmail}</small> ) </div>
                        <div>Subject: {this.props.eMail.subject}</div>
                        <div>Received: {formatDateEmailDetails(this.props.eMail.sentAt)}</div>
                        <p className='email-body-details flex wrap'>{this.props.eMail.body}</p>
                        {(this.state.reply) ? <InboxEmailReply onReply={this.onReply} {...this.props} eMail={this.props.eMail}/> : ''}
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}