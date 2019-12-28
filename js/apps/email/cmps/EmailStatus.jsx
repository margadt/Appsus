import eMailService from '../services/eMailService.js'

export default class EmailStatus extends React.Component {
    render() {

        return <React.Fragment>
            <div className='my-progress-container'>
                <div id='my-progress' className="flex">
                    <div id='my-bar' style={{ width: eMailService.getEmailPercentageRead() }}>
                        <div id='my-bar-text'>{eMailService.getEmailPercentageRead()}%</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}