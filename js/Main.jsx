'use strict'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const { createBrowserHistory } = History;
const history = createBrowserHistory();


import HomeApp from './pages/HomeApp.jsx'
import EmailApp from './apps/email/pages/EmailApp.jsx'
import KeepApp from './apps/missKeep/pages/KeepApp.jsx/index.js'


class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <NavBar></NavBar>
                <Switch>
                    <Route component={HomeApp} path='/' exact></Route>
                    <Route component={EmailApp} path='/email' exact></Route>
                    <Route component={KeepApp} path='/keep' exact></Route>
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)