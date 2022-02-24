import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [charList, setCharList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(0);

    const {loading, error, getAllComics} = useMarvelService();
        
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

    useEffect(() => onRequest(offset), [offset]);

    const onRequest = (off) => {
        getAllComics(off).then(onCharListLoaded)
    };

    const onCharListLoaded = (charListNext) => {
        setCharList(charList.concat(charListNext));
        setNewItemLoading(false);
    };

    const onAddMoreItems = () => {
        setNewItemLoading(true);
        setOffset(offset => offset + 8);
    };
    
    const elements = charList.map((item, i) => {
        return (
            <Item key={item.id} id={item.id} name={item.name} thumbnail={item.thumbnail} price={item.price}/>
        )
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {elements}
            </ul>
            {(newItemLoading) ? <Spinner/> :
            <button disabled={newItemLoading} onClick={onAddMoreItems} className="button button__main button__long">
                <div  className="inner">load more</div>
            </button>
            }
        </div>
    )
}

const Item = (props) => {
    const {id, name, thumbnail, price} = props

    return (
        <li className="comics__item">
            <Link to={`${id}`}>
                <img src={thumbnail} alt={name} className="comics__item-img"/>
                <div className="comics__item-name">{name}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>
    )
}

export default ComicsList;