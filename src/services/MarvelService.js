import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=dfa514ed9c0b8328c98274d28baf8afd';
    const _baseOffset = 260;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char, total) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            total: total,
        }
    }

    const getAllComics = async (offset = 210) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (item) => {
        return {
            id: item.id,
            name: item.title,
            price: item.prices[0].price ? `${item.prices[0].price}$` : 'not available',
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
            description: item.textObjects[0]?.text || 'not description',
            language: item.textObjects.language || 'en-us',
            pageCount: item.pageCount,
        }
    }

    return {loading,
            error, 
            process, 
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getAllComics, 
            getComic, 
            getCharacterByName,
            setProcess};
}

export default useMarvelService;