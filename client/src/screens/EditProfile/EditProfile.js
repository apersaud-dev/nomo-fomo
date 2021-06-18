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
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })

    useEffect(() => {
        axios
            .get('http://localhost:8080/business', { withCredentials: true})
            .then((res) => {
                console.log(res);
                setBusinessInfo(res.data[0])
                setAddress(res.data[0].address);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo((prevState => ({
            ...prevState,
            [name]: value
        })));
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedBusinessInfo = {
            name: businessInfo.name,
            address: businessInfo.address,
            city: businessInfo.city,
            province: businessInfo.province, 
            postal_code: businessInfo.postal_code,
            country: businessInfo.country,
            latitude: businessInfo.latitude,
            longitude: businessInfo.longitude
        }

        axios
            .put(`http://localhost:8080/business/${businessInfo.display_id}`, {updatedBusinessInfo}, { withCredentials: true})
            .then((res)=> {
                console.log(res);
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        console.log(results);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        console.log(latLng);
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
                    <div className="form__row">
                        <label className="form__label" htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={businessInfo.email} onChange={handleInputChange}/>
                    </div>
                    <PlacesAutoComplete value={address} onChange={setAddress} onSelect={handleSelect}>
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
                            return (
                                <div>
                                    <input {...getInputProps({ placeholder: "Type address" })} />
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
                    <div className="form__row">
                        <label className="form__label" htmlFor="address">Address 1</label>
                        <input type="text" id="address" name="address" value={businessInfo.address} onChange={handleInputChange}/>
                    </div>
                    {/* <div className="form__row">
                        <label className="form__label" htmlFor="addressTwo">Address 2</label>
                        <input type="text" id="addressTwo" name="addressTwo" onChange={handleInputChange}/>
                    </div> */}
                    <div className="form__row">
                        <label className="form__label" htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={businessInfo.city} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="province">Province</label>
                        <input type="text" id="province" name="province" value={businessInfo.province} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="postal_code">Postal Code</label>
                        <input type="text" id="postal_code" name="postal_code" value={businessInfo.postal_code} onChange={handleInputChange}/>
                    </div>
                    <div className="form__row">
                        <label className="form__label" htmlFor="country">Country</label>
                        <input type="text" id="country" name="country" value={businessInfo.country} onChange={handleInputChange}/>
                    </div>
                    <Link to="/profile">Cancel</Link>
                    <button type="submit">Save</button>
                </form>
            </main>
        )
    }
}

export default EditProfile;