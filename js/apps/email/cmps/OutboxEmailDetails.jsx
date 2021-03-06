import { formatDateEmailDetails } from '../services/eMailUtils.js'
import OutboxEmailReply from '../cmps/OutboxEmailReply.jsx'

export default class OutboxEmailDetails extends React.Component {
    
    state = {reply: false}

    onReply = () => {
        this.setState (prevState => ({reply: !prevState.reply}));
    }

    render() {
        return <React.Fragment>
            <div className='dynamic-comp'>
                <div className='flex column align-center'>
                    <div className="nav-buttons-container flex align-center">
                        <div className="nav-button pointer" onClick={this.onReply}>Reply</div>
                        <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(-1)}>Previous</div>
                        <div className="nav-button pointer" onClick={this.props.goBack}>Back To Outbox</div>
                        <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(1)}>Next</div>
                    </div>
                    <div className='nav-buttons-container flex column'>
                        <div>To: {this.props.eMail.to} ( <small>{this.props.eMail.to}</small> ) </div>
                        <div>Subject: {this.props.eMail.subject}</div>
                        <div>Sent: {formatDateEmailDetails(this.props.eMail.sentAt)}</div>
                        <p className='email-body-details flex wrap'>{this.props.eMail.body}</p>
                        {(this.state.reply) ? <OutboxEmailReply {...this.props} onReply={this.onReply} eMail={this.props.eMail}/> : ''}
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}