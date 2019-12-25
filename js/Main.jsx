'use strict'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const { createBrowserHistory } = History;
const history = createBrowserHistory();


import HomeApp from './pages/HomeApp.jsx'
import EmailApp from './apps/email/pages/EmailApp.jsx'
import EmailDetailsPage from './apps/email/pages/EmailDetailsPage.jsx'
import KeepApp from './apps/missKeep/pages/KeepApp.jsx'
import NavBar from './apps/cmps/NavBar.jsx'


class Main extends React.Component {

    render() {
        return (
            <main>
                <Router history={history}>
                    <NavBar></NavBar>
                    <Switch>
                        <Route component={HomeApp} path='/' exact></Route>
                        <Route component={EmailApp} path='/email' exact></Route>
                        <Route component={EmailDetailsPage} path='/email/:id' exact></Route>
                        <Route component={KeepApp} path='/keep' exact></Route>
                    </Switch>
                </Router>
            </main>
        )
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
)