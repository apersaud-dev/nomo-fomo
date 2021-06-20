import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './../../components/Header';
import EventsHeader from './../../components/EventsHeader';
import EventList from './../../components/EventList';
import './Profile.scss';

function Profile(props) {
    const [businessInfo, setBusinessInfo] = useState(null);

    // useEffect to make your API calls to your back-end
    useEffect(() => {
        axios
            .get('http://localhost:8080/business', { withCredentials: true})
            .then((res) => {
                // console.log(res.data[0]);
                setBusinessInfo(res.data[0])
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
    }, [])

    if(!businessInfo) {
        return (
            <main>
                <h4>You must be logged in to view this page.</h4>
                <a href="http://localhost:8080/auth/google">Login</a>
            </main>
        )
    } else {
        const { 
            // name, 
            // email, 
            // address,
            // address_two, 
            // city, 
            // province, 
            // postal_code, 
            // country, 
            events 
        } = businessInfo;
        return (
            <div>
                <Header {...props}/>
                <main className="profile">
                    {/* <div className="profile__card">
                        <h2>{name}</h2>
                        <h3>{email}</h3>
                        <h3>{address}</h3>
                        <h3>{address_two}</h3>
                        <div className="" >
                            <h3>{city}</h3>
                            <h3>{province}</h3>
                        </div>
                        <div className="">
                            <h3>{postal_code}</h3>
                            <h3>{country}</h3>
                        </div>
                    </div> */}
                    {/* <Link to="/profile-edit">Edit Profile</Link>
                    <Link to="http://localhost:8080/logout">Logout</Link> */}
                    <div className="profile__events-container">
                        <EventsHeader />
                        <EventList events={events} />
                    </div>
                </main>
            </div>
        )
    }

}
export default Profile;

// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform#maps_places_autocomplete_addressform-javascript

// https://bezkoder.com/node-js-upload-image-mysql/

// https://pttrns.com/applications/676#8083