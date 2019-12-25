import EmailPreview from './EmailPreview.jsx'

export default function eMailList(props) {
    return <React.Fragment>
                {props.eMails.map((eMail, i) => <EmailPreview key={i} eMail={eMail}/>)}
           </React.Fragment>
}