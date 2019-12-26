import EmailPreview from './EmailPreview.jsx'

export default class eMailList extends React.Component {

    // state = {
    //     className: 'hidden',
    //     checkedEmails: {}
    // }

    // showButtons = (value, id) => {
    //     this.setState(prevState => ({checkedEmails: [...prevState.checkedEmails, {[id]: value}]}), () => {
    //         console.log(this.state.checkedEmails);
    //         this.state.checkedEmails.every(email => { return email.value === false})
    //         ? this.setState({className: 'hidden'}) : this.setState({className: 'show'})});
    //     // let isAllUnchecked = this.state.checkedEmails.every(email => {
    //     //     return email.value === false;
    //     // })
    //     // console.log(isAllUnchecked);
        
    // }

    render () {
    return <React.Fragment>
        <div className="email-list">
        {/* <div className="edit-menu"> */}
            {/* <div className={`${this.state.className}`}> */}
                {/* <button onClick={this.props.onMarkRead}>Mark as Read</button>
                <button>Mark as Unread</button> */}
            {/* </div> */}
        {/* </div> */}
            {this.props.eMails.map((eMail, i) => <EmailPreview key={i} eMail={eMail} showButtons={this.showButtons} onMarkRead={this.props.onMarkRead}/>)}
        </div>
    </React.Fragment>
    }
}