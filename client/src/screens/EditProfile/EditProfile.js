import { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.scss';

function EditProfile(props) {
    const [businessInfo, setBusinessInfo] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/business', { withCredentials: true})
            .then((res) => {
                console.log(res);
                setBusinessInfo(res.data[0])
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo((prevState => ({
            ...prevState,
            [name]: value
        })));
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(businessInfo.country);
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


    if(!businessInfo) {
        return (
            <main>
                <p>Content is loading...</p>
            </main>
        )
    } else {
        console.log(businessInfo.country);
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
                    <button type="submit">Save</button>
                </form>
            </main>
        )
    }
}

export default EditProfile;