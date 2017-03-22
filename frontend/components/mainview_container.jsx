import React from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import WeatherDetailView from './weather_detail_view';
import {fetchCity, fetchCities, updateCity, deleteCity} from '../actions/city_actions';
import {fetchBatchWeather} from '../actions/weather_actions';
import {fetchWeather} from '../util/weather_api_util';

  const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    cities: state.cities,
    weather: state.weather
  });

  const mapDispatchToProps = dispatch => ({
    updateCity: city => dispatch(updateCity(city)),
    fetchCity: city_id => dispatch(fetchCity(city_id)),
    deleteCity: city_id => dispatch(deleteCity(city_id)),
    fetchCities: user_id => dispatch(fetchCities(user_id)),
    fetchBatchWeather: query => dispatch(fetchBatchWeather(query)),
  });

class MainViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      search: "",
      currentId: 0,
      currentWeather: this.dummyWeather()
    };
    this.reloadWeather = this.reloadWeather.bind(this);
    this.sortBars = this.sortBars.bind(this);
    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.order = this.order.bind(this);
  }

  dummyWeather() {
    return {name: "", main: {temp: ""}, weather:[{icon:"d10"}]};
  }

  componentWillMount() {
    this.props.fetchCities(this.props.currentUser.id)
    .then(this.reloadWeather);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.weather !== this.props.weather) {
      const weather = nextProps.weather.list || [];
      this.setState({weather},()=> {
        if (this.state.weather.length) {this.setMain();}
      });
    }
  }

  setMain(city = this.state.weather[0]) {
    let currentWeather = city || this.dummyWeather();
    let currentId = city.id || 0;
    this.setState({currentWeather, currentId});
  }

  reloadWeather() {
    const query = Object.keys(this.props.cities).join(',');
    if (query) {this.props.fetchBatchWeather(query);}
  }

  sortBars(array) {
    if (!array.length) return [];
    return array.sort((a, b) => (
      this.order(a) < this.order(b) ? 1 : -1
    ));
  }

  handleSearch(e) {
    e.preventDefault();
    fetchWeather(e.target.firstChild.value)
    .then(currentWeather => this.setState({currentWeather}));
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  barPercent(city) {
    if (this.props.cities[city.id]) {
      const userCity = this.props.cities[city.id];
      const avg = (userCity.max + userCity.min) / 2;
      return 100 - Math.floor(100 * Math.abs(avg - city.main.temp) / avg);
    }
  }

  linePercent(city) {
    if (this.props.cities[city.id]) {
      const userCity = this.props.cities[city.id];
      const avg = (userCity.max + userCity.min) / 2;
      return 100 - Math.floor(100 * Math.abs(avg - userCity.max) / avg);
    }
  }

  order(city) {
    return this.barPercent(city) - this.linePercent(city);
  }

  barMaker(city) {
    const barPercent = this.barPercent(city);
    const linePercent = this.linePercent(city);
    const color = Math.min(this.order(city) * 4 + 55, 140);
    return  <div className='bar'>
              <div className='fillbar'
                style={{
                  width: `${barPercent}%`,
                  background: `hsl(${color}, 85%, 45%)`
                }}>
              </div>
              <div className='bound-line' style={{width: `${linePercent}%`}}></div>
            </div>;
  }

  render() {
    const sorted = this.sortBars(this.state.weather);
    const cityBars = sorted.map(city => (
      <li
        key={city.id}
        onClick={() => this.setMain(city)}>
          {this.barMaker(city)}
          <p>{city.name}</p>
          <p>{`${Math.floor(city.main.temp)}˚F`}</p>
      </li>
    ));

    return (
      <div className='mainview-wrapper'>
        <Navbar />
        <div className='content-wrapper'>
          <WeatherDetailView
            currentId={this.state.currentId}
            currentWeather={this.state.currentWeather}
            reloadWeather={this.reloadWeather} />
          <div className='right'>
            <button
              className='reload'
              onClick={this.reloadWeather}>
              <i className='fa fa-refresh'/>
              Reload
            </button>
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
