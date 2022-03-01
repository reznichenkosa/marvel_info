import imgPath from './ErrorMessage.jpeg';

const ErrorMessage = () => {
    return (
        <img alt='error' style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}}
             src={imgPath} />
    )
}

export default ErrorMessage;