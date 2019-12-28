export default class BookForm extends React.Component {
    state = {
        name: '',
        price: null
    }

    inputChange = (ev) => {
        ev.preventDefault();
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value });
    }

    render() {
        return <div>
            <input type="text" placeholder="name" name="name"
                onChange={this.inputChange} value={this.state.name}></input>
            <input type="number" placeholder="price" name="price"
                onChange={this.inputChange} value={this.state.price}></input>
        </div>
    }
}
