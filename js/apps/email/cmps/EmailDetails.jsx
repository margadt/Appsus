import { formatDateEmailDetails } from '../services/eMailUtils.js'
import EmailReply from '../cmps/EmailReply.jsx'

export default class EmailDetails extends React.Component {
    
    state = {reply: false}

    onReply = () => {
        this.setState (prevState => ({reply: !prevState.reply}));
    }

    render() {
        return <React.Fragment>
            <div className='dynamic-comp'>
                <div className="nav-buttons-container flex align-center">
                    <div className="nav-button pointer" onClick={this.onReply}>Reply</div>
                    <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(-1)}>Previous</div>
                    <div className="nav-button pointer" onClick={this.props.goBack}>Back To Inbox</div>
                    <div className="nav-button pointer" onClick={() => this.props.changeEmailShown(1)}>Next</div>
                </div> 
                <div>Subject: {this.props.eMail.subject}</div>
                <div>Received: {formatDateEmailDetails(this.props.eMail.sentAt)}</div>
                <div>{this.props.eMail.body}</div>
                {(this.state.reply) ? <EmailReply eMail={this.props.eMail}/> : ''}
            </div>
        </React.Fragment>
    }
}