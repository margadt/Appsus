import EmailPreview from './EmailPreview.jsx'

export default function eMailList(props) {
    return <React.Fragment>
        <div className="email-list">
            {props.eMails.map((eMail, i) => <EmailPreview key={i} eMail={eMail} />)}
        </div>
    </React.Fragment>
}