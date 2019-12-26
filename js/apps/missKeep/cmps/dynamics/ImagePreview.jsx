const { Link } = ReactRouterDOM;

export default class ImagePreview extends React.Component {

    state = {
        hidden: false
    }

    onDelBtnToggler = () => {
        console.log('ondel', this.state.hidden);
        this.setState({hidden: false});

    }


    render() {
        const { note } = this.props;
        return <Link to={`/keep/${note.id}`}>
            <div className='note' onClick={this.onDelBtnToggler}>
                <h2>{note.info.title}</h2>
                <img src={note.info.url} alt='note-img' />
                {!this.state.hidden && <button onClick={this.props.onDeleteNote} >x</button>}
            </div>
        </Link>
    }
}
