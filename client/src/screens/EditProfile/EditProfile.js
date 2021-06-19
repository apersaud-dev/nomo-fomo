import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './EditProfile.scss';

// https://www.npmjs.com/package/react-places-autocomplete
// https://www.youtube.com/watch?v=uJYqQdnw8LE
// https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes

function EditProfile(props) {
    const [businessInfo, setBusinessInfo] = useState(null);
    const [address, setAddress] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })

    useEffect(() => {
        axios
            .get('http://localhost:8080/business', { withCredentials: true})
            .then((res) => {
                setBusinessInfo(res.data[0])
                setAddress(res.data[0].address);
                setAddressTwo(res.data[0].address_two)
                setCity(res.data[0].city);
                setProvince(res.data[0].province);
                setPostalCode(res.data[0].postal_code);
                setCountry(res.data[0].country);
                const latLng = [res.data[0].latitude, res.data[0].longitude];
                setCoordinates(latLng);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name==="city") {
            setCity(value);
        } else if (name === "province") {
            setProvince(value);
        } else if (name === "postal_code") {
            setPostalCode(value);
        } else if (name === "country") {
            setCountry(value);
        } else if (name === "address_two") {
            setAddressTwo(value);
        }
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedBusinessInfo = {
            name: businessInfo.name,
            address: address,
            address_two: addressTwo,
            city: city,
            province: province, 
            postal_code: postal_code,
            country: country,
            latitude: coordinates.lat,
            longitude: coordinates.lng
        }

        axios
            .put(`http://localhost:8080/business/${businessInfo.display_id}`, {updatedBusinessInfo}, { withCredentials: true})
            .then((res)=> {
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        let addressNumber = ""
        let addressRoute = ""
        results[0].address_components.forEach((component) => {
            switch (component.types[0]) {
                case "street_number": {
                  addressNumber = component.long_name;
                  break;
                }
          
                case "route": {
                  addressRoute = component.short_name;
                  break;
                }
          
                case "postal_code": {
                  setPostalCode(component.long_name);
                  break;
                }
                case "locality":
                    setCity(component.long_name)  
                  break;
          
                case "administrative_area_level_1": {
                    setProvince(component.short_name);
                  break;
                }
                case "country":
                    setCountry(component.long_name);
                  break;
            }
        })
        const combinedAddress = `${addressNumber} ${addressRoute}`;
        setAddress(combinedAddress);
    }


    if(!businessInfo) {
        return (
            <main>
                <p>Content is loading...</p>
            </main>
        )
    } else {
        return (
            <main>
                <h1>dummy content for now.</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form__row">
                        <label className="form__label" htmlFor="name">Business Name</label>
                        <input type="text" name="name" id="name" value={businessInfo.name} onChange={handleInputChange}/>
                    </div>
                    {/* <div className="form__row">
                        <label className="form__label" htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={businessInfo.email} onChange={handleInputChange}/>
                    </div> */}
                    <PlacesAutoComplete value={address} onChange={setAddress} onSelect={handleSelect}>
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
                            return (
                                <div className="form__row"> 
                                    <label className="form__label" htmlFor="address">Address 1</label>
                                    <input {...getInputProps({ placeholder: "Type address" })} id="address" name="address" />
                                    <div>
                                        {loading ? <div>...loading</div> : null }

                                        {suggestions.map((suggestion) => {
                                            const style = { backgroundColor : suggestion.active ? "#dd71fe" : "#fff"}

                                            return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                        })}
                                    </div>
                                </div>
                            )
                        }}
                    </PlacesAutoComplete>
                    {/* <div className="form__row">
                        <label className="form__label" htmlFor="address">Address 1</label>
                        <input type="text" id="address" name="address" value={businessInfo.address} onChange={handleInputChange}/>
                    </div> */}
                    <div className="form__row">
                        <label className="form__label" htmlFor="address_two">Address 2</label>
                        <input type="text" id="address_two" name="address_two" onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={city} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="province">Province</label>
                        <input type="text" id="province" name="province" value={province} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="postal_code">Postal Code</label>
                        <input type="text" id="postal_code" name="postal_code" value={postal_code} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" value={country} onChange={handleInputChange}/>
                    </div>
                    <Link to="/profile">Cancel</Link>
                    <button type="submit">Save</button>
                </form>
            </main>
        )
    }
}

export default EditProfile;