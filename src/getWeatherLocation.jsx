import React, {Component} from 'react';
import App from './App';

export default class GetWeatherLocation extends Component {

    state={

        weather:{},
      options:{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          
        }
      },
     
  
      };
  
      componentDidMount= () => {
        if(this.props){
          console.log('https://api.openweathermap.org/data/2.5/weather?lat='+this.props.lat+'&lon='+this.props.long+'&appid=ea96610d2c2ca8a4517af7fb46f4c3bc&units=metric');
          fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.props.lat+'&lon='+this.props.long+'&appid=ea96610d2c2ca8a4517af7fb46f4c3bc&units=metric',this.state.options)
          .then(response =>  response.json())
          .then(response => this.setState({weather:response}))
          .catch(err => console.error(err));
  
      } }

      render(){
          return (
              <>
                <App weather={this.state.weather} />              
              </>
          );
      }
}