
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import { CSSTransition,  } from 'react-transition-group';
import {Helmet} from "react-helmet";


import './singleComicPage.scss';

const SingleComicPage = () => {
    
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line 
    },[comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <div style={{margin: '0 auto', transform: 'translateY(50%)'}}><Spinner/></div> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
          
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {name, price, thumbnail, description, language, pageCount} = comic;
    const [animation, setAnimation] = useState(false);
    useEffect(() => {
        setAnimation((animation) => !animation)
    }, []);
    return (
        <CSSTransition in={animation} timeout={1000} classNames="my-char">
            <div className="single-comic">

                <Helmet>
                    <title>{`Comic | ` + name}</title>
                    <meta name={name} content={name} />
                </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">Pages: {pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </CSSTransition>
    );
}

export default SingleComicPage;