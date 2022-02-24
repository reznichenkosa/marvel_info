import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <h1 style={{textAlign: 'center'}}>Page not found 404</h1>
            <Link style={{display: 'block', margin: '0 auto', width: '150px', textAlign: 'center', color: '#9F0013'}} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;