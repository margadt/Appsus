export default class AddNoteInput extends React.Component {

    render() {
        return <div className='flex center border'>
            <input name='note-add-input' type="text" placeholder="What's on your mind?" />
            <input type="radio" name="text" value="Text" />
            <input type="radio" name="img" value="Enter image url" />
            <input type="radio" name="youtube" value="Enter video url" />
            <input type="radio" name="todo" value="Text" />
        </div>
    }
}