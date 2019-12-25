import Home from './pages/Home.jsx'
class App extends React.Component {

    render() {
        return (
            <main>
                <Home />
            </main>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
)