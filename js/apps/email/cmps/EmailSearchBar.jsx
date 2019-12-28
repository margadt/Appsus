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

    sortBy = (event) => {
        this.props.history.push('/email/');
        let sortBy = event.target.value;
        this.props.onSortBy(sortBy);
    }

    render() {
        return <React.Fragment>
            <div className='email-search-bar flex center align-center'>
                <input type='text' id='search-mail' name='search-mail' placeholder='Search Mail' 
                       value={this.props.searchText} onChange={this.searchText}/>
                <select name='filter' className='search-bar-filter' onChange={this.searchText}>
                    <option default value=''>All</option>
                    <option value='isRead'>Unread Messages</option>
                    <option value='isImportant'>Important</option>
                    <option value='isSent'>Sent Mail</option>
                </select>
                <div>
                    <span>Sort by:</span>
                        <button className='subject-sort-button pointer' value='subject' onClick={this.sortBy}>Subject</button>
                        <button className='sentat-sort-button pointer' value='sentAt' onClick={this.sortBy}>Date</button>
                </div>
            </div>
        </React.Fragment>
            }
}