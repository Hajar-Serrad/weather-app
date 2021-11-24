import React, {Component} from 'react';

import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

import moment from 'moment';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTemperatureHalf, faDroplet, faDownLeftAndUpRightToCenter, faEye, faWind, faCloudRain, faSnowflake} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTemperatureHalf, faDroplet, faDownLeftAndUpRightToCenter, faEye, faWind, faCloudRain, faSnowflake);

export default class App extends Component {
  
  state={
    city:"",
    search:false,
    options:{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        
      }
    },
    weather:{},
  }

  handleChange=(event)=>{    this.setState({city: event});  }

  handleSelect=(event)=>{ 
  
  setTimeout(()=>{
    this.setState({city:event.split(',')[0],search:true});
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=ea96610d2c2ca8a4517af7fb46f4c3bc&units=metric',this.state.options)
      .then(response =>  response.json())
      .then(response => this.setState({weather:response}))
      .catch(err => console.error(err));
  },0.05); 
  }
  
  


    render() {
        moment().locale(); 
        const date = moment().format('dddd MMMM Do, YYYY');
        const time = moment().format('hh:mm a');
        return (
            <div className={this.state.weather.main?(this.state.weather.main.temp>16?'app warm':'app'):
                            this.props.weather.main?(this.props.weather.main.temp>16?'app warm':'app'):
                            'app'
                            }>
              <main>  
              <PlacesAutocomplete className="a" value={this.state.city}  onChange={this.handleChange} onSelect={this.handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="search-box">
                  <input {...getInputProps({
                placeholder: 'Type a city ...',
                className: "search-bar",
              })} />
              </div>
            
            <div className="autocomplete-dropdown-container">
              {loading && <div className="loading">Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span className="suggestion">{suggestion.description}</span>
                    
                  </div>
                );
              })}
            </div>
          </div>
        )}
              </PlacesAutocomplete>
             {this.state.search?
            (Object.keys(this.state.weather).length==2?
            <div className="error">
              <div className="message">Oups... On ne trouve pas d'informations pour le nom de ville que vous avez entré! <br/>  Veuillez vérifier le nom et réessayer!!</div>
            </div>
            :
              <div>
              <div className="weather-description">
            {this.state.weather.sys? <div>
              <div className="weather-location">
                 {this.state.weather.name}, {this.state.weather.sys.country} 
              </div>
              <div className="date-time">
              On {date} At {time}
              </div>
              <div className="temp-icon">
              <div className="icon"> <img src={"http://openweathermap.org/img/wn/"+this.state.weather.weather[0].icon+".png"} alt=""/> </div>
              <div className="temp">{this.state.weather.main.temp} °C</div>
              </div>
               <div  className="description">{this.state.weather.weather[0].description}</div>
             </div>:<br/>
             }
            </div>
             <div className="weather-details">
              {this.state.weather.main ? 
                <div className="min-max-temp">
               <span className="icon"><FontAwesomeIcon icon="fa-solid fa-temperature-half"/></span><span className="label">Temperature</span>
               <span className="temp">{this.state.weather.main.temp_min} °C /  {this.state.weather.main.temp_max} °C</span>
               </div>
               :<br/>} <br /><br />
               {this.state.weather.main ? 
                <div className="humidity">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-droplet" /></span><span className="label">Humidity</span>
                <span className="humidity-value">{this.state.weather.main.humidity} %</span>
                </div>
               :<br/>}
                <br /><br />
               {this.state.weather.main ? 
                <div className="pressure">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-down-left-and-up-right-to-center"/></span><span className="label">Pressure</span>
                <span className="pressure-value">{this.state.weather.main.pressure} hPa</span>
                </div>
               :<br/>}
               <br /><br />
               <div className="visibility">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-eye" /></span><span className="label">Visibility</span>
                <span className="visibility-value">{this.state.weather.visibility} m</span>
                </div>
                <br /><br />
               {this.state.weather.wind? 
                <div className="wind">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-wind" /></span><span className="label">Wind</span>
                <span className="wind-value">{this.state.weather.wind.speed} m/s</span>
                </div>
               :<br/>}
                <br /><br />
               {this.state.weather.rain? 
                <div className="rain">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-cloud-rain" /></span><span className="label">Rain</span>
                <span className="rain-value">{this.state.weather.rain['1h']} mm/h</span>
                <br /><br /></div>
               :<></>}
                
               {this.state.weather.snow? 
                <div className="snow">
                <span className="icon"><FontAwesomeIcon icon="fa-solid fa-snowflake" /></span><span className="label">Snow</span>
                <span className="snow-value">{this.state.weather.snow['1h']} mm/h</span>
                </div>
               :<></>}                 
             </div>
           </div>
              )
             :
             <div>
                <div className="weather-description">
              {this.props.weather.sys? <div>
                <div className="weather-location">
                   {this.props.weather.name}, {this.props.weather.sys.country} 
                </div>
                <div className="date-time">
                On {date} At {time}
                </div>
                <div className="temp-icon">
                <div className="icon"> <img src={"http://openweathermap.org/img/wn/"+this.props.weather.weather[0].icon+".png"} alt=""/> </div>
                <div className="temp">{this.props.weather.main.temp} °C</div>
                </div>
                 <div  className="description">{this.props.weather.weather[0].description}</div>
               </div>:<br/>
               }
              </div>
               <div className="weather-details">
                {this.props.weather.main ? 
                  <div className="min-max-temp">
                 <span className="icon"><FontAwesomeIcon icon="fa-solid fa-temperature-half"/></span><span className="label">Temperature</span>
                 <span className="temp">{this.props.weather.main.temp_min} °C /  {this.props.weather.main.temp_max} °C</span>
                 </div>
                 :<br/>} <br /><br />
                 {this.props.weather.main ? 
                  <div className="humidity">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-droplet" /></span><span className="label">Humidity</span>
                  <span className="humidity-value">{this.props.weather.main.humidity} %</span>
                  </div>
                 :<br/>}
                  <br /><br />
                 {this.props.weather.main ? 
                  <div className="pressure">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-down-left-and-up-right-to-center"/></span><span className="label">Pressure</span>
                  <span className="pressure-value">{this.props.weather.main.pressure} hPa</span>
                  </div>
                 :<br/>}
                 <br /><br />
                 <div className="visibility">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-eye" /></span><span className="label">Visibility</span>
                  <span className="visibility-value">{this.props.weather.visibility} m</span>
                  </div>
                  <br /><br />
                 {this.props.weather.wind? 
                  <div className="wind">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-wind" /></span><span className="label">Wind</span>
                  <span className="wind-value">{this.props.weather.wind.speed} m/s</span>
                  </div>
                 :<br/>}
                  <br /><br />
                 {this.props.weather.rain? 
                  <div className="rain">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-cloud-rain" /></span><span className="label">Rain</span>
                  <span className="rain-value">{this.props.weather.rain['1h']} mm/h</span>
                  <br /><br /></div>
                 :<></>}
                  
                 {this.props.weather.snow? 
                  <div className="snow">
                  <span className="icon"><FontAwesomeIcon icon="fa-solid fa-snowflake" /></span><span className="label">Snow</span>
                  <span className="snow-value">{this.props.weather.snow['1h']} mm/h</span>
                  </div>
                 :<></>}                 
               </div>
             </div>
             }
              </main>
             
            </div>
        );
    }
}

