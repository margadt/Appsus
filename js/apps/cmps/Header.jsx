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
            <div className="filter-bar">
                <input name='title' onChange={this.changeInput} value={this.state.filterBy.title} type='text' placeholder={this.props.placeHolder} />
                <button onClick={this.onFilterClick}>Go!</button>
            </div>
            <select name='search-filter'>
                <option value='all'>All</option>
                <option value='done'>Done</option>
            </select>
            <button>menuBtn</button>
        </div>
    }
}