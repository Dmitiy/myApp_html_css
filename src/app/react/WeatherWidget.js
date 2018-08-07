import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import WeatherContainer from '../components/WeatherContainer';

class WeatherWidget extends React.Component {
    render() {
        return (
            <React.Fragment>
                <WeatherContainer />
            </React.Fragment>
        );
    }
}

ReactDOM.render( <WeatherWidget /> , document.getElementById('weatherWidget'));