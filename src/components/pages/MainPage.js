import { useState } from "react";
import {Helmet} from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../searchForm/SearchForm";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <title>Marvel | Information portal</title>
                <meta name="Information portal" content="Information portal" />
            </Helmet>
            <RandomChar/>
                <div className="char__content">
                    <CharList selected={selectedChar} onCharSelected={onCharSelected}/>
                    <ErrorBoundary>
                        <div className="otherInfo">
                            <CharInfo charId={selectedChar}/>
                            <SearchForm/>
                        </div>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;