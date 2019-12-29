const { NavLink } = ReactRouterDOM

export default function NavBar(props) {
    return <nav>
        <React.Fragment>
            <div className="nav-bar-container flex center">
                <div className='nav-bar-icon-container'>
                    <NavLink activeClassName="active" to='/' exact >
                        <i className="fas fa-horse-head pointer"></i>
                    </NavLink>
                </div>
                <div className='nav-bar-icon-container'>
                    <NavLink activeClassName="active" to='/email' exact>
                        <i className="fas fa-at"></i>
                    </NavLink>
                </div>
                <div className='nav-bar-icon-container'>
                    <NavLink activeClassName="active" to='/keep' exact>
                        <i className="fas fa-sticky-note"></i>
                    </NavLink>
                </div>
                <div className='nav-bar-icon-container'>
                    <NavLink activeClassName="active" to='/book' exact>
                        <i className="fas fa-book-dead"></i>
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    </nav>
}