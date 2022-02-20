import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                {/* eslint-disable-next-line */}
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* eslint-disable-next-line */}
                    <li><a href="#">Characters</a></li>
                    {/* eslint-disable-next-line */}
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;