import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CSSTransition,TransitionGroup  } from 'react-transition-group';

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharacterPage = lazy(() => import('../pages/SingleCharacterPage'))

const AnimatedPages = () => {

    const location = useLocation();
    return (
        <main>
            <Suspense fallback={<Spinner/>}>
                <TransitionGroup component={null}>
                    <CSSTransition classNames="page" timeout={1000}>
                        <Routes>
                            <Route path="/" element={<MainPage/>} />
                            <Route path="/characters/:characterId" element={<SingleCharacterPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<SingleComicPage/>} />
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </Suspense>
        </main>
    )
}

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader characters='/' comics='/comics'/>
                <AnimatedPages/>
            </div>
        </Router>
    )
}

export default App;