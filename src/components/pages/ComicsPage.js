
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import {Helmet} from "react-helmet";


const ComicsPage = () => {
    
    return (
        <>
            <Helmet>
                <title>Marvel | Comics</title>
                <meta name="Comics" content="Marvel comics" />
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;