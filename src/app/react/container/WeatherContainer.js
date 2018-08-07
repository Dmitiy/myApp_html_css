import React, { Component } from 'react'

import { Weather } from '../components/Weather';
import fetchWeatherApi from '../actions/fetchWeatherApi';

class WeatherContainer extends Component {
	state = {
		options: null
	}

	componentDidMount() {
		fetchWeatherApi();
	}

	render() {
		return (
			<div className='weather-container'>
				<p><a href="https://yandex.ru/pogoda/sevastopol">Яндекс.Погода</a></p>
				<Weather weatherApi={ options } />
			</div>
		)
	}
}

export default WeatherContainer;