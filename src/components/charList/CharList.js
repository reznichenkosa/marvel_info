import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(210);

    const {loading, error, getAllCharacters} = useMarvelService();

    // loading content on scroll

    // useEffect(() => {
    //     window.addEventListener("scroll", onScroll);
    //     return () => {
    //         window.removeEventListener("scroll", onScroll)
    //     }
    // }, []);

    // const onScroll = (e) => {
    //     if (offset <= 1000) {
    //         if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
    //             onAddMoreItems();
    //             setNewItemLoading(true);
    //         } else {
    //             setNewItemLoading(true);
    //         }
    //     } else {
    //         window.removeEventListener("scroll", onScroll);
    //     }
    // };

    useEffect(() => onRequest(), [offset]);

    const onRequest = () => {
        getAllCharacters(offset).then(onCharListLoaded)
    };

    const onCharListLoaded = (charListNext) => {
        setCharList(charList.concat(charListNext));
        setNewItemLoading(false);
    };

    const onAddMoreItems = () => {
        setNewItemLoading(true);
        setOffset(offset => offset + 9);
    };

    const elements = charList.map(item => {
        return (
        <Item onCharSelected={props.onCharSelected} selected={props.selected} key={item.id } id={item.id} name={item.name} thumbnail={item.thumbnail}/>
        )
    });
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid">
                {elements}
            </ul>
            {(newItemLoading) ? <Spinner/> :
            <button disabled={newItemLoading} onClick={onAddMoreItems} style={(offset >= 1000) ? {display: 'none'} : null} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
            }
        </div>
    )
}

const Item = (props) => {
    const {id, name, thumbnail, onCharSelected, selected} = props;
    return (
        <li onFocus={() => onCharSelected(id)} tabIndex={0} onClick={() => onCharSelected(id)} className={'char__item' + ((selected === id) ? ' char__item_selected' : '')} >
            <img src={thumbnail} style={(thumbnail.includes('image_not_available')) ? {objectFit: "unset"} : {}} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
};

CharList.propTypes = {
    onCharSelected: PropTypes.func
};

export default CharList;