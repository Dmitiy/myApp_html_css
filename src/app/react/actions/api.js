const api = {
    lat: 44.593613,
    lon: 33.546972,
    lang: 'ru_RU',
    limit: 7,
    hours: true,
    extra: true,
}

export const url = () => `https://api.weather.yandex.ru/v1/forecast?lat=${api.lat}&lon=${api.lon}`;