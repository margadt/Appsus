

export default class EmailApp extends React.Component {

    render() {
        return <React.Fragment>
            <div>
                <EmailStatus/>
                <EmailFilter/>
                <EMailCompose/>
            </div>
            <EMailList/>
        </React.Fragment>
    }
}