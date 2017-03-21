import React from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import {fetchCity, fetchCities} from '../actions/city_actions';
import {fetchWeather, fetchBatchWeather} from '../actions/weather_actions';

  const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    cities: state.cities,
    weather: state.weather
  });

  const mapDispatchToProps = dispatch => ({
    fetchCity: city_id => dispatch(fetchCity(city_id)),
    fetchCities: user_id => dispatch(fetchCities(user_id)),
    fetchWeather: query => dispatch(fetchWeather(query)),
    fetchBatchWeather: array => dispatch(fetchBatchWeather(array)),
  });

class MainViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {weather: []};
    this.reloadWeather = this.reloadWeather.bind(this);
  }

  componentWillMount() {
    this.props.fetchCities(this.props.currentUser.id)
    .then(this.reloadWeather)
    .then(this.sortWeather);
  }

  reloadWeather() {
    if (!!this.props.cities) {
      this.props.fetchBatchWeather(
        Object.keys(this.props.cities).map(id => (
          this.props.cities[id].api_code
        ))
      );
    }
  }

  sortWeather() {
    let weather;
    if (Object.keys(this.props.weather).length) {
      weather = this.props.weather.undefined.list;
    } else {
      weather = [];
    }
    this.state.weather = weather.sort((a, b) => (
      this.barPercent(a) > this.barPercent(b) ? 1 : -1
    ));
  }

  barPercent(city) {
    let userCity = this.props.cities[city.id];
    let avg = (userCity.max + userCity.min) / 2;
    return 100 - Math.floor(100 * Math.abs(avg - city.main.temp) / avg);
  }

  linePercent(city) {
    const userCity = this.props.cities[city.id];
    const avg = (userCity.max + userCity.min) / 2;
    return 100 - Math.floor(100 * Math.abs(avg - userCity.max) / avg);
  }

  barMaker(city) {
    const linePercent = this.linePercent(city);
    const barPercent = this.barPercent(city);
    return  <div className='bar'>
              <div className='fillbar'
                style={{
                  width: `${barPercent}%`,
                  background: `hsl(${barPercent/linePercent * 130 - 80}, 85%, 45%)`
                }}>
              </div>
              <div className='bound-line' style={{width: `${linePercent}%`}}></div>
            </div>;
  }

  render() {
    const cityBars = this.state.weather.map(city => {
      return <li key={city.id}>
        {this.barMaker(city)}
        <p>{city.name}</p>
        <p>{Math.floor(city.main.temp)}</p>
      </li>;
    });
    return (
      <div>
        <Navbar location="/"/>
        <div className='content-wrapper'>
          <div className='left'>
            {this.state.weather[0]}
          </div>
          <div className='right'>
            <button className='reload' onClick={this.reloadWeather}>Relaod</button>
            <ul>
              {cityBars}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainViewContainer);
