const { NavLink } = ReactRouterDOM

export default function NavBar(props) {
    return <nav>
        <ul>
            <li><NavLink activeClassName="active" to='/' exact >Home</NavLink></li>
            <li><NavLink activeClassName="active" to='/email' exact>missEmail</NavLink></li>
            <li><NavLink activeClassName="active" to='/keep' exact>missKeep</NavLink></li>
        </ul>
    </nav>
}