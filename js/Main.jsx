'use strict'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const { createBrowserHistory } = History;
const history = createBrowserHistory();


import HomeApp from './pages/HomeApp.jsx'
import EmailApp from './apps/email/pages/EmailApp.jsx'
import KeepApp from './apps/missKeep/pages/KeepApp.jsx'
import NavBar from './apps/cmps/NavBar.jsx'
import EmailCompose from '../js/apps/email/cmps/EmailCompose.jsx'
import BooksApp from './apps/MissBook/pages/BooksApp.jsx'
import BookPage from './apps/MissBook/pages/BookPage.jsx'
import BookAdd from './apps/MissBook/pages/BookAdd.jsx'
import Footer from './apps/cmps/Footer.jsx'



class Main extends React.Component {

    render() {
        return (
            <main>
                <Router history={history}>
                    <EmailCompose />
                    <NavBar></NavBar>
                    <Switch>
                        <Route component={HomeApp} path='/' exact></Route>
                        <Route component={EmailApp} path='/email'></Route>
                        <Route component={KeepApp} path='/keep' exact></Route>
                        <Route component={BooksApp} path='/book' exact></Route>
                        <Route component={BookPage} path='/book/:bookId' exact></Route>
                        <Route component={BookAdd} path='/addBook' exact></Route>
                    </Switch>
                    <Footer />
                </Router>
            </main>
        )
    }
}


ReactDOM.render(
    <Main />,
    document.getElementById('root')
)