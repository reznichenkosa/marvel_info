import { useState, useEffect } from 'react';
import MarvelSevice from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {
    
    const [char, setChar] = useState({}),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(false);

    const marvelSevice = new MarvelSevice();

    useEffect(() => {
        updateChar();
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = (char) => {
        setError(false);
        setLoading(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelSevice.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={(thumbnail.includes('image_not_available')) ? {objectFit: "unset"} : {}} alt={name} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{(name && name.length > 24) ? name.slice(0, 20) + '...' : (name) ? name : 'not found'}</p>
                <p className="randomchar__descr">
                    {(description) ? description.slice(0, 200) + '...' : 'Description not found'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;