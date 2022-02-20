import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll)
    }

    onRequest = () => {
        this.marvelService.getAllCharacters(this.state.offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset) {
            this.onRequest();
        }
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    onCharListLoaded = (charList) => {
        this.setState(() => ({charList: this.state.charList.concat(charList), loading: false, newItemLoading: false}));
    }

    onAddMoreItems = () => {
        this.setState({offset: this.state.offset + 9, newItemLoading: true});
        
    }

    onScroll = (e) => {
        if (this.state.offset <= 1542) {
            if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight && !this.state.newItemLoading) {
                this.onAddMoreItems();
            }
        } else {
            window.removeEventListener("scroll", this.onScroll)
        }
    };

    render() {

        const {charList, loading, error, newItemLoading} = this.state;

        const elements = charList.map(item => {
            return (
            <Item onCharSelected={this.props.onCharSelected} selected={this.props.selected} key={item.id } id={item.id} name={item.name} thumbnail={item.thumbnail}/>
            )
        })
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                <ul className="char__grid">
                    {content}
                </ul>
                {(newItemLoading) ? <Spinner/> :
                <button disabled={newItemLoading} onClick={this.onAddMoreItems} style={(this.state.offset >= 1542) ? {display: 'none'} : null} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
                }
            </div>
        )
    }
}

const Item = (props) => {
    const {id, name, thumbnail, onCharSelected, selected} = props;
    return (
        <li onClick={() => onCharSelected(id)} className={'char__item' + ((selected === id) ? ' char__item_selected' : '')} >
            <img src={thumbnail} style={(thumbnail.includes('image_not_available')) ? {objectFit: "unset"} : {}} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;