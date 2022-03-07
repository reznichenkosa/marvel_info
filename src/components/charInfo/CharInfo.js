import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { CSSTransition,  } from 'react-transition-group';

import './charInfo.scss';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);

    const {process, getCharacter, clearError, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line 
    },[])

    useEffect(() => {
        if (props.charId) {
            updateChar();
        }
        // eslint-disable-next-line 
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const setContent = (process, char) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>;
            case 'loading':
                return <Spinner/>;
            case 'confirmed':
                return <View char={char}/>;
            case 'error':
                return <ErrorMessage/>
            default:
                throw new Error('Unexpected process state');
        }
     }

    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {
                setContent(process, char)
            }
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const [animation, setAnimation] = useState(false);
    useEffect(() => {
        setAnimation((animation) => !animation)
    }, []);
    return (
        <CSSTransition in={animation} timeout={1000} classNames="my-char">
            <div>
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
            </div>
        </CSSTransition>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;