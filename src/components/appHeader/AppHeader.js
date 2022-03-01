import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = (props) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                {/* eslint-disable-next-line */}
                <Link to={props.characters}>
                    <span>Marvel</span> | Information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({ isActive }) => ({color: isActive ? '#e62429' : 'inherit'})} to={props.characters}>Characters</NavLink></li>
                    <li><NavLink style={({ isActive }) => ({color: isActive ? '#e62429' : 'inherit'})} to={props.comics}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;