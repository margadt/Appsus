import eMailService from '../services/eMailService.js'
import EmailStatus from '../cmps/EmailStatus.jsx'
import EmailFilter from '../cmps/EmailFilter.jsx'
import EmailList from '../cmps/EmailList.jsx'
import EmailSearchBar from '../cmps/EmailSearchBar.jsx'
import EmailDetailsPage from '../pages/EmailDetailsPage.jsx'
import eventBusService from '../../../services/eventBusService.js'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export default class EmailApp extends React.Component {

    eventKiller = null;

    state = {
        eMails: [],
        filterBy: '',
        searchText: '',
        currSortBy: 'sentAt',
        prevSortBy: ''
    }

    componentDidMount() {
        this.loadEmails();
        this.eventKiller = eventBusService.on('loadEmails', () => {
            this.loadEmails();
        })
    }

    componentWillUnmount() {
        this.eventKiller && this.eventKiller();
    }

    loadEmails = () => {
        eMailService.getEmails(this.state.filterBy, this.state.searchText, this.state.currSortBy, this.state.prevSortBy).then(eMails => {
            return this.setState({ eMails });
        })
    }

    onSetFilter = (filterBy) => {
        this.setState(({ filterBy: filterBy }), this.loadEmails);
    }

    onCompose = () => {
        eventBusService.emit('toggle', true);
    }

    onToggleMarkAsRead = (id) => {
        eMailService.toggleMarkAsRead(id);
        this.loadEmails();
    }

    onDelete = (id) => {
        eMailService.deleteEmail(id);
        this.loadEmails();
    }

    onImportant = (id) => {
        eMailService.toggleImportant(id);
        this.loadEmails();
    }

    onSearchText = (searchText, filter) => {
        this.setState(({ searchText: searchText, filterBy: filter }), this.loadEmails);
    }

    onSortBy = (sortBy) => {
        this.setState(({ prevSortBy: this.state.currSortBy, currSortBy: sortBy}), this.loadEmails);
    }

    render() {
        return <React.Fragment>
            <div className="main-container grid">
                <div className="email-nav-bar flex column align-center">
                    <div className="compose-button pointer" onClick={this.onCompose}>Compose +</div>
                    <EmailFilter {...this.props} onSetFilter={this.onSetFilter} />
                    <EmailStatus eMails={this.state.eMails} />
                </div>
                <EmailSearchBar {...this.props} eMails={this.state.eMails} onSearchText={this.onSearchText}
                    onSetFilter={this.onSetFilter} onSortBy={this.onSortBy} />
                <Router>
                    <Switch>
                        <Route exact path='/email'>
                            <EmailList {...this.props} eMails={this.state.eMails} filter={this.state.filterBy} onToggleMarkAsRead={this.onToggleMarkAsRead}
                                onDelete={this.onDelete} onImportant={this.onImportant} />
                        </Route>
                        <Route path={`/email/:id`} render={(props) => <EmailDetailsPage {...props} />}>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </React.Fragment>
    }
}