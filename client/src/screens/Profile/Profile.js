import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './../../components/EventList';
import './Profile.scss';

function Profile(props) {
    const [businessInfo, setBusinessInfo] = useState(null);

    
    // useEffect to make your API calls to your back-end

    useEffect(() => {
        axios
            .get('http://localhost:8080/business', { withCredentials: true})
            .then((res) => {
                console.log(res.data[0]);
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
            name, 
            email, 
            address, 
            city, 
            province, 
            postal_code, 
            country, 
            events 
        } = businessInfo;
        console.log(events);
        return (
            <main>
                <h2>{name}</h2>
                <h3>{email}</h3>
                <h3>{address}</h3>
                <h3>{city}</h3>
                <h3>{province}</h3>
                <h3>{postal_code}</h3>
                <h3>{country}</h3>
                <EventList events={events} />
            </main>
        )
    }

}
export default Profile;