import EmailPreview from './EmailPreview.jsx'

export default class eMailList extends React.Component {

    render () {
    return <React.Fragment>
        <div className="email-list">
            {this.props.eMails.map((eMail, i) => <EmailPreview key={i} eMail={eMail} 
            onMarkAsUnread={this.props.onMarkAsUnread} onMarkAsRead={this.props.onMarkAsRead}
            onDelete={this.props.onDelete} onImportant={this.props.onImportant}/>)}
        </div>
    </React.Fragment>
    }
}