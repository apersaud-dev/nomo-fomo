import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import date from 'date-and-time';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Logo from './../../assets/Images/nomo-fomo-linear.svg';
import './Drawer.scss';

function Drawer(props) {
  const [address, setAddress] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const seLngBounds = Math.abs(props.bounds[0]);
    const seLatBounds = Math.abs(props.bounds[1]);
    const nwLngBounds = Math.abs(props.bounds[2]);
    const nwLatBounds = Math.abs(props.bounds[3]);

    const filteredEvents = props.markers.filter((marker) => {
      if (
        nwLngBounds <= Math.abs(marker.businesses.longitude) &&
        Math.abs(marker.businesses.longitude) <= seLngBounds &&
        seLatBounds <= Math.abs(marker.businesses.latitude) &&
        Math.abs(marker.businesses.latitude) <= nwLatBounds
      ) {
        return marker
      }
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
      return (a.start_time < b.start_time) ? -1 : ((a.start_time > b.start_time) ? 1 : 0);
    })
    setEvents(sortedEvents);

  }, [props.bounds]);

  const handleSearchSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    props.mapRef.current.panTo({ lat: latLng.lat, lng: latLng.lng })
    props.mapRef.current.setZoom(15);
    
  }


  const handleSelectEvent = (eventLat, eventLng) => {
    props.mapRef.current.panTo({ lat: eventLat, lng: eventLng })
    props.mapRef.current.setZoom(20);
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

                  {suggestions.map((suggestion, index) => {
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
                      <div {...getSuggestionItemProps(suggestion, {style})}    className="profile-form__suggestions" key={index}>
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
          {events.map((map) => {
            // const testString = `${map.businesses.latitude}, ${map.businesses.longitude}`;
            const eventDate = date.format((new Date(map.start_time)), 'ddd, MMM DD YYYY')
            const startTime = date.format((new Date(map.start_time)), 'hh:mm A');
            const endTime = date.format((new Date(map.end_time)), 'hh:mm A');
            const eventLat = map.businesses.latitude;
            const eventLng = map.businesses.longitude;

            return (
              <li key={map.id} className="drawer__event" onClick={() => {handleSelectEvent(eventLat, eventLng)}} >
                <h5 className="drawer__event-name"  >{map.name}</h5>
                <p className="drawer__event-location">{map.businesses.name}</p>
                <p className="drawer__event-location">{map.businesses.address}, {map.businesses.city}, {map.businesses.province}</p>
                <p className="drawer__event-date"><span className="drawer__label-bold">Date:</span> {eventDate}</p>
                <p className="drawer__event-time"><span className="drawer__label-bold">Time:</span> {startTime} - {endTime}</p>
                <p className="drawer__event-admission"><span className="drawer__label-bold">Admission Fee:</span> {map.fee === 0.00 ? "Free" : `$${map.fee}`}</p>
              </li>
            )
          })}
        </ul>
        </div>
    </section>
  )
}

export default Drawer;
