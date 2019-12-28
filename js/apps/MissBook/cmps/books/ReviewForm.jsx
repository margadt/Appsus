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
        return <form className="review-container">
            <input type="text" name='name' value={this.state.name} onChange={this.changeInput} placeholder='Full Name' />
            <select name='rate' onChange={this.changeInput}>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐">⭐</option>
            </select>
            <textarea name='review' rows="4" cols="50" placeholder='Add a review' onKeyUp={this.changeInput}>
            </textarea>
            <button onClick={this.onSave}>Save</button>

        </form>
    }
}