import { url } from './api';

export const requestToWeatherApi  = () => {
    console.log('fetching data ...');

    fetch( url(), {
        headers: {
            'Accept-Charset': 'utf-8',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'X-Yandex-API-Key': 'b2c2dcf3-4eaa-44b9-8168-15366a0591cf',
        },
        mode : 'no-cors'
    })
    .then(blob => blob.json())
    .then(data => console.log('res:' , data))
    .catch((err) => console.log('ERROR: ', err));
}

export const fetchWeatherApi = () => {

    console.log('fetching weather api ...');

    const result =  requestToWeatherApi();
    console.log(result);
    
}