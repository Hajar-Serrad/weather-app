import React, { Component } from "react";
import GetWeatherLocation from "./getWeatherLocation";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};


function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default class GeoLocation extends Component {

   state={geoLocation:{}};
  componentDidMount=()=>{

    let getLocationPromise = new Promise((resolve, reject) => {

        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then((result)=>{
                if (result.state === "granted") {
                  
                  //If granted then you can directly call your function here
                  navigator.geolocation.getCurrentPosition(
                    (pos)=>{
                        var crd = pos.coords;
                      
                        resolve({latitude: crd.latitude, 
                            longitude: crd.longitude})
                      }
                  );
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition((pos)=>{
                    var crd = pos.coords;
                  
                    resolve({latitude: crd.latitude, 
                        longitude: crd.longitude})
                  }, errors, options);
                } else if (result.state === "denied") {
                  //If denied then you have to show instructions to enable location
                }
                result.onchange = function () {
                  console.log(result.state);
                };
              });
          } else {
            reject("your browser doesn't support geolocation API");
          }
    
  },

  

 //
   
    )
    getLocationPromise.then((location) => {
        this.setState({geoLocation:{'lat':location.latitude,'long':location.longitude}});
    }).catch((err) => {
        console.log(err)
    })
}

  render() {

    return (
       
      <>
      {this.state.geoLocation["lat"] && this.state.geoLocation["long"] ?<GetWeatherLocation lat={this.state.geoLocation["lat"].toFixed(5)} long={this.state.geoLocation["long"].toFixed(5)}/>:<br/>
      } </>
    );
  }
}

