const { NavLink } = ReactRouterDOM
export default function NavBar(props) {
    return <nav>
        <ul>
            <li><NavLink activeClassName="active" to='/' exact >Home</NavLink></li>
            <li><NavLink activeClassName="active" to='/book' exact>Books</NavLink></li>
            <li><NavLink activeClassName="active" to='/addBook' exact>Add a Book</NavLink></li>
            <li><NavLink activeClassName="active" to='/about' exact>About</NavLink></li>
        </ul>
    </nav>
}