export default class Header extends React.Component {
    state = {
        filterBy: {
            title: '',
        }
    }

    changeInput = (ev) => {
        ev.preventDefault()
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }))
    }

    onFilterClick = () => {
        this.props.onFilter(this.state.filterBy);
    }

    render() {
        return <div className='note-header flex space-between border'>
            <img className='logo' src='../../../img/temp-logo.png' />
            <div className="filter-bar flex align-center">
                <input className='notes-search' name='title' onChange={this.changeInput} value={this.state.filterBy.title} type='text' placeholder={this.props.placeHolder} />
                <button className='go pointer' onClick={this.onFilterClick}>Go!</button>
            </div>
            <div className='flex align-center'>
            <select className='notes-search-filter pointer' name='search-filter'>
                <option value='all'>All</option>
                <option value='done'>Done</option>
            </select>
            </div>
            <div className='flex align-center'>
            <button className='menuBtn pointer'>menuBtn</button>
            </div>
        </div>
    }
}