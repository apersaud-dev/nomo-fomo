import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './../../components/Header';
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
                console.log(err);
            })
    }, [])

    if(!businessInfo) {
        return (
            <main className="must-login">
                <h5 className="must-login__text">You must be logged in to view this page.</h5>
                <a href="http://localhost:8080/auth/google" className="must-login__link">Login</a>
            </main>
        )
    } else {
        const { 
            events 
        } = businessInfo;
        return (
            <div>
                <Header {...props}/>
                <main className="profile">
                    <EventList events={events} />
                </main>
            </div>
        )
    }

}
export default Profile;

// https://bezkoder.com/node-js-upload-image-mysql/