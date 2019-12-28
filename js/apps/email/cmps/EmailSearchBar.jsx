export default class EmailSearchBar extends React.Component {

    state = {
        searchText: '',
        filter: ''
    }

    searchText = (event) => {
        this.props.history.push('/email/');
        let field = event.target.name;
        let value = event.target.value;
        (field === 'search-mail') ? 
            this.setState(({searchText: value}), () => this.props.onSearchText(this.state.searchText, this.state.filter)) : 
            this.setState(({filter: value}), () => this.props.onSearchText(this.state.searchText, this.state.filter));
    }

    render() {
        return <React.Fragment>
            <div className='email-search-bar flex center'>
                <input type='text' id='search-mail' name='search-mail' placeholder='Search Mail' 
                       value={this.props.searchText} onChange={this.searchText}/>
                <select name='filter' className='search-bar-filter' onChange={this.searchText}>
                    <option default value=''>All</option>
                    <option value='isRead'>Unread Messages</option>
                    <option value='isImportant'>Important</option>
                    <option value='isSent'>Sent Mail</option>
                </select>
            </div>
        </React.Fragment>
            }
}