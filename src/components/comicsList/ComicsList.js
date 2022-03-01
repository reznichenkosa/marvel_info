import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [charList, setCharList] = useState([]),
          [newItemLoading, setNewItemLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [animationFlag, setAnimationFlag] = useState(false);

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

    // useEffect(() => {setAnimationFlag(true)}, []);

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
            <CSSTransition key={i} timeout={300} classNames="my-node" >
                <Item key={item.id} animationFlag={animationFlag} id={item.id} name={item.name} thumbnail={item.thumbnail} price={item.price}/>
            </CSSTransition>
        )
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
            </ul>
            {(newItemLoading) ? <div style={{margin: '6px auto 0 auto'}}><Spinner/></div> :
            <button disabled={newItemLoading} onClick={onAddMoreItems} className="button button__main button__long">
                <div  className="inner">load more</div>
            </button>
            }
        </div>
    )
}

const Item = (props) => {
    const {id, name, thumbnail, price, animationFlag} = props
    
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