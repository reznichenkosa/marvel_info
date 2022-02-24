import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = (props) => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                {/* eslint-disable-next-line */}
                <Link to={props.characters}>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} to={props.characters}>Characters</NavLink></li>
                    <li><NavLink style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} to={props.comics}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;