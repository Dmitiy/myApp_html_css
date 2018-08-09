import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import WeatherContainer from './container/WeatherContainer';

export default () => {
    ReactDOM.render( <WeatherContainer /> , document.getElementById('weatherWidget'));
}