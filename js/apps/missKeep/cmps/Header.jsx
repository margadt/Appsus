export default class Header extends React.Component {
    state = {
        filterBy: {
            title: '',
        },
        selectFilter: 'all'
    }

    changeInput = (ev) => {
        ev.preventDefault()
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => { this.props.onFilter(this.state.filterBy, this.state.selectFilter) })
    }

    onSetSelectFilter = (ev) => {
        console.log('evtarval', ev.target.value);

        this.setState({ selectFilter: ev.target.value }, () => {
            this.props.onFilter(this.state.filterBy, this.state.selectFilter)
        });
    }

    render() {
        return <div className='note-header flex center align-center'>
            <div className="filter-bar flex align-center">
                <input className='notes-search' name='title' onChange={this.changeInput} value={this.state.filterBy.title} type='text' placeholder={this.props.placeHolder} />
            </div>
            <div className='flex align-center'>
                <select className='notes-search-filter pointer' name='search-filter' onChange={this.onSetSelectFilter}>
                    <option value='all'>All</option>
                    <option value='isPinned'>Pinned</option>
                </select>
            </div>
        </div>
    }
}