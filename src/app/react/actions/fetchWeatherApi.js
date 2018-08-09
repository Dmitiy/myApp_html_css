import { url } from './api';

export const requestToWeatherApi  = () => {
    console.log('fetching data ...');

    fetch( url() )
        .then(blob => blob.json())
        .then(data => console.log('url', data))
    
    
}