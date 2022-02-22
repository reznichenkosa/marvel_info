import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelSevice from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null),
          [loading, setLoading] = useState(false),
          [error, setError] = useState(false);

    const marvelSevice = new MarvelSevice();

    useEffect(() => {
        updateChar();
        console.log('hasdsdaffasd');
    },[])

    useEffect(() => {
        if (props.charId) {
            updateChar();
        }
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        onCharLoading();
        marvelSevice.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = (char) => {
        setError(false);
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={(thumbnail.includes('image_not_available')) ? {objectFit: "unset"} : {}} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {(description) ? description : 'Description not found'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics'}
                {
                    comics.map((item, i) => {
                        return (i < 10) ? (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        ) : null
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;