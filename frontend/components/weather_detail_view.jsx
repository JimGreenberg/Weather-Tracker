import React from 'react';
import {connect} from 'react-redux';
import {fetchCity, fetchCities, updateCity, deleteCity, addCity} from '../actions/city_actions';
import {fetchWeather} from '../util/weather_api_util';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  cities: state.cities,
  weather: state.weather
});

const mapDispatchToProps = dispatch => ({
  addCity: city => dispatch(addCity(city)),
  updateCity: city => dispatch(updateCity(city)),
  fetchCity: city_id => dispatch(fetchCity(city_id)),
  deleteCity: city_id => dispatch(deleteCity(city_id)),
  fetchCities: user_id => dispatch(fetchCities(user_id)),
  fetchBatchWeather: query => dispatch(fetchBatchWeather(query)),
});

class WeatherDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    // this.favoriteButton = this.favoriteButton.bind(this);
    this.state = {
      min: "",
      max: "",
      search: "",
      buttonWillAdd: false,
      currentWeather: this.props.currentWeather
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currentId !== newProps.currentId) {
      fetchWeather(newProps.currentId)
      .then(currentWeather => this.setState({
        currentWeather,
        min: this.props.cities[currentWeather.id].min,
        max: this.props.cities[currentWeather.id].max,
        buttonWillAdd: false}));
    }
  }

  update(field) {
    return e => {
      let text = e.currentTarget.value;
      if (field === 'min' || field === 'max') {
        if (parseInt(text)) {
          this.setState({[field]: parseInt(text)});
        }
      } else {
        this.setState({[field]: text});
      }
    };
  }

  handleSearch(e) {
    e.preventDefault();
    fetchWeather(e.target.firstChild.value)
    .then(currentWeather => {
      let seen = this.props.cities[currentWeather.id];
      let min = "";
      let max = "";
      if (seen) {
        min = seen.min;
        max = seen.max;
      }
      this.setState({currentWeather, min, max, buttonWillAdd: !seen});
    });
  }

  favoriteButton() {
    let bool = this.state.buttonWillAdd;
    return (
      <button
        className={`fa fa-${bool ? 'star-o' : 'ban'}`}
        onClick={this.handleButton}>
        {bool ? 'Favorite' : 'Unfavorite'}
      </button>
    );
  }

  handleButton(e) {
    e.preventDefault();
    if (this.state.buttonWillAdd) {
      this.props.addCity({
        name: this.state.currentWeather.name,
        user_id: this.props.currentUser.id,
        api_code: this.state.currentWeather.id,
        min: this.state.min,
        max: this.state.max
      })
      .then(this.props.reloadWeather)
      .then(this.toggleButton);

    } else {
      this.props.deleteCity(this.props.cities[this.state.currentWeather.id])
      .then(this.props.reloadWeather)
      .then(this.toggleButton);
    }
  }

  toggleButton() {
    this.setState({buttonWillAdd: !this.state.buttonWillAdd});
  }

  render() {
    const weather = this.state.currentWeather;

    return(
      <div className='detail-view'>
        <form id='search' onSubmit={this.handleSearch}>
          <input
            type='text'
            value={this.state.search}
            placeholder='Search for a city...'
            onChange={this.update('search')} />
          <button form='search' type='submit'><i className='fa fa-search'/></button>
        </form>
        <p>{weather.name}</p>

        {this.favoriteButton()}
        <p>{Math.floor(weather.main.temp)}</p>
        <input
          type='text'
          value={this.state.min}
          placeholder='Min'
          onChange={this.update('min')} />
        <input
          type='text'
          value={this.state.max}
          placeholder='Max'
          onChange={this.update('max')} />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetailView);
