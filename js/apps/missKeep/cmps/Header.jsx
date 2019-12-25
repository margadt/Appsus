export default class Header extends React.Component {

    render() {
        return <div className='note-header flex space-between border'>
            <img className='logo' src={this.props.imgSrc} />
            <input name='search-notes' type='text' placeholder='Search notes' />
            <select name='search-filter'>
                <option value='all'>All</option>
                <option value='done'>Done</option>
            </select>
            <button>menuBtn</button>
        </div>
    }
}