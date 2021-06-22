import { useState } from 'react';
import { Link } from 'react-router-dom';
import date from 'date-and-time';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Logo from './../../assets/Images/nomo-fomo-linear.svg';
import './Drawer.scss';

function Drawer(props) {
  const [address, setAddress] = useState("");

  const handleSearchSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    props.mapRef.current.panTo({ lat: latLng.lat, lng: latLng.lng })
    props.mapRef.current.setZoom(15);
  }

  
  const handleSelectEvent = (e) => {
    // e.preventDefault();
    const splitIt = e.target.id.split(",");
    const latitude = Number(splitIt[0]);
    const longitude = Number(splitIt[1]);
    props.mapRef.current.panTo({ lat: latitude, lng: longitude })
    props.mapRef.current.setZoom(18);
  }

  return (
    <section className="drawer">
      <div className="drawer__header">
        <Link to="/">
          <img src={Logo} alt="NOMO FOMO logo" className="drawer__logo" />
        </Link>
        <PlacesAutoComplete 
            value={address} 
            onChange={setAddress} 
            onSelect={handleSearchSelect}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
            return (
              <div className="drawer__search"> 
                <label className="drawer__search-label" htmlFor="address">Where do you want to explore?</label>
                <input 
                  {...getInputProps({ placeholder: "Search for a place" })} 
                  className="drawer__search-input"
                  id="address" 
                  name="address" 
                />
                <div>
                  {loading ? <div>...loading</div> : null }

                  {suggestions.map((suggestion) => {
                    const style = { 
                      color: suggestion.active ? "#F17EFE" : "#f3eff5",
                      border: suggestion.active? "1px solid rgba(7, 7, 7, 0.3)" : "none",
                      borderRadius: "10px",
                      padding: "0.25rem 0.5rem",
                      transform: suggestion.active ? "translateX(0.5rem)" : "translateX(0)",
                      marginBottom: "0.25rem",
                      boxShadow: suggestion.active ? "inset 5px 5px 10px #0e0e0e, inset -5px -5px 10px #3a3a3a" : "none"
                  }
                
                    return (
                      <div {...getSuggestionItemProps(suggestion, {style})}    className="profile-form__suggestions">
                        {suggestion.description}
                      </div>
                    )})}
                </div>
              </div>
            )
          }}
        </PlacesAutoComplete>
      </div>
      <div className="drawer__events">
        <ul className="drawer__event-list">
          {props.markers.map((map) => {
            const testString = `${map.businesses.latitude}, ${map.businesses.longitude}`;
            const eventDate = date.format((new Date(map.start_time)), 'ddd, MMM DD YYYY')
            const startTime = date.format((new Date(map.start_time)), 'hh:mm A');
            const endTime = date.format((new Date(map.end_time)), 'hh:mm A');
  
            return (
              <li key={map.display_id} className="drawer__event">
                <h5 className="drawer__event-name" onClick={handleSelectEvent} id={testString}>{map.name}</h5>
                <p className="drawer__event-date">{eventDate}</p>
                <p className="drawer__event-time">{startTime} - {endTime}</p>
              </li>
            )
          })}
        </ul>
        </div>
    </section>
  )
}

export default Drawer;
