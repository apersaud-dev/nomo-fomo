import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './MapTest.scss';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapTest extends Component {
  static defaultProps = {
    center: {
    //   lat: 59.95,
    //   lng: 30.33,
      lat: 43.642583,
      lng: -79.387060
    },
    zoom: 18
  };
 
  render() {

    console.log(this.props.center);
    return (
      // Important! Always set the container height explicitly
      <div className="map__container" >
        <GoogleMapReact
          bootstrapURLKeys={{
               key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
               language: 'en',
                region: 'ca',
                libraries: ['places']
            }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            lat={43.642583}
            lng={-79.387060}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapTest;