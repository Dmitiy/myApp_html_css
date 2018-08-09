import React, { Component } from 'react';

import { requestToWeatherApi } from '../actions/fetchWeatherApi';

class WeatherContainer extends Component {
	constructor (props){
		super(props)
		this.state = {
			options: null
		}

	}

	componentDidMount() {
		requestToWeatherApi()
		.then((data) => {
			this.setState({
				options: data
			})
		})
	}

	render() {
		console.log('state', this.state.options);
		if(!this.state.options) {
			return 'loading ...'
		}
		return (
			<div className='weather-container'>
				<h2>test!</h2>
			</div>
		)
	}
}

export default WeatherContainer;