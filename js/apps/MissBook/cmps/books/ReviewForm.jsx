export default class ReviewForm extends React.Component {
    state = { id: 1, name: '', rate: '⭐⭐⭐⭐⭐', created: '', review: '' }

    changeInput = (ev) => {
        ev.preventDefault();
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value });
    }

    onSave = (ev) => {
        ev.preventDefault();
        this.setState(({ created: new Date().toLocaleString() }), () => this.props.onSave({ ...this.state }));
        this.setState(prev => ({ id: prev.id + 1 }));


    }

    render() {
        return <form className="form-container flex column wrap">
            <div className='flex center'>
            <input className='name-review' type="text" name='name' value={this.state.name} onChange={this.changeInput} placeholder='Full Name' />
            </div>
            <div className='flex center'>
            <select className='review-rate' name='rate' onChange={this.changeInput}>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐">⭐</option>
            </select>
            </div>
            <textarea className='review-text-area' name='review' rows="10" cols="30" placeholder='Add a review' onKeyUp={this.changeInput}>
            </textarea>
            <div className='flex center'>
                <button className='save-review pointer' onClick={this.onSave}>Save</button>
            </div>
        </form>
    }
}