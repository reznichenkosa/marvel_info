
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import { CSSTransition,  } from 'react-transition-group';


import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    
    const {characterId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    },[characterId])

    const updateChar = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <div style={{margin: '0 auto', transform: 'translateY(50%)'}}><Spinner/></div> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
          
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description, comics} = char;
    const comicsList = comics.map(item => {
        return <li key={item.id} className="char__comics-item">{item.name}</li>
    })
    const [animation, setAnimation] = useState(false);
    useEffect(() => {
        setAnimation((animation) => !animation)
    }, []);
    return (
        <CSSTransition in={animation} timeout={1000} classNames="my-char">
            <div className="single-character">
                <img src={thumbnail} alt={name} className="single-character__img"/>
                <div className="single-character__info">
                    <h2 className="single-character__name">{name}</h2>
                    <p className="single-character__descr">{(description) ? description : 'Description not found'}</p>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 0 ? comicsList : 'There is no comics'}
                    </ul>
                </div>

                <Link to='/' className="single-character__back">Back to all</Link>
            </div>
        </CSSTransition>
    );
}

export default SingleCharacterPage;