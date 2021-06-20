import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './../../components/Header';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './EditProfile.scss';

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
                default:
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
            <div>
                <Header {...props}/>
                <main className="edit-profile">
                    <form className="profile-form" onSubmit={handleFormSubmit}>
                        <h1 className="edit-profile__title">Edit Your Profile</h1>
                        <div className="profile-form__row">
                            <label className="profile-form__label" htmlFor="name">Business Name</label>
                            <input 
                                className="profile-form__input"
                                type="text" 
                                name="name" 
                                id="name" 
                                value={businessInfo.name} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <PlacesAutoComplete 
                            value={address} 
                            onChange={setAddress} 
                            onSelect={handleSelect}
                            // styles={myStyles}
                        >
                            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => {
                                return (
                                    <div className="profile-form__row"> 
                                        <label className="profile-form__label" htmlFor="address">Address 1</label>
                                        <input 
                                            {...getInputProps({ placeholder: "Type address" })} 
                                            className="profile-form__input"
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
                                                    padding: suggestion.active? "4px 16px": "4px 8px",
                                                    marginBottom: "4px",
                                                    boxShadow: suggestion.active ? "inset 5px 5px 10px #0e0e0e, inset -5px -5px 10px #3a3a3a" : "none"
                                                }

                                                return <div {...getSuggestionItemProps(suggestion, {style})} className="profile-form__suggestions">{suggestion.description}</div>
                                            })}
                                        </div>
                                    </div>
                                )
                            }}
                        </PlacesAutoComplete>
                        <div className="profile-form__row">
                            <label className="profile-form__label" htmlFor="address_two">Address 2</label>
                            <input 
                                className="profile-form__input"
                                type="text" 
                                id="address_two" 
                                name="address_two" 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="profile-form__row">
                            <label className="profile-form__label" htmlFor="city">City</label>
                            <input 
                                className="profile-form__input"
                                type="text" 
                                id="city" 
                                name="city" 
                                value={city} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="profile-form__row profile-form__row--short">
                            <div className="profile-form__box">
                                <label className="profile-form__label" htmlFor="province">Province</label>
                                <input 
                                    className="profile-form__input"
                                    type="text" 
                                    id="province" 
                                    name="province" 
                                    value={province} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="profile-form__box">
                                <label className="profile-form__label" htmlFor="postal_code">Postal Code</label>
                                <input 
                                    className="profile-form__input"
                                    type="text" 
                                    id="postal_code" 
                                    name="postal_code" 
                                    value={postal_code} 
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="profile-form__row">
                            <label className="profile-form__label" htmlFor="country">Country</label>
                            <input 
                                className="profile-form__input"
                                type="text" 
                                id="country" 
                                name="country" 
                                value={country} 
                                onChange={handleInputChange}/>
                        </div>
                        <div className="profile-form__actions">
                            <Link to="/profile" className="profile-form__button">Cancel</Link>
                            <button type="submit" className="profile-form__button">Save</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

export default EditProfile;