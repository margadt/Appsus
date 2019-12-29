export default class Filter extends React.Component {
    state = {
        filterBy: {
            title: '',
            price: ''
        }
    }

    changeInput = (ev) => {
        const field = ev.target.name;
        const value = (ev.target.name === 'price') ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => this.onFilterClick());
    }

    onFilterClick = () => {
        this.props.onFilter(this.state.filterBy);
    }

    render() {
        return <div className="book-search-bar flex">
            <div className="input-container">
                <input className='book-search' type="text" placeholder="Book title" value={this.state.filterBy.title}
                    onChange={this.changeInput} name="title"></input>
            </div>
            <div className="input-container">
                <input className='price-search' type="text" placeholder="Price less Than"
                    value={this.state.filterBy.price} name="price"
                    onChange={this.changeInput}></input>
            </div>
            <div className="input-container">
            <button className='filter-button pointer' onClick={this.onFilterClick}>Filter</button>
            </div>

        </div>
    }
}