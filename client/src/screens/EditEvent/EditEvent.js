import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import date from 'date-and-time';
import './EditEvent.scss';


function EditEvent(props) {
    const [ eventInfo, setEventInfo ] = useState(null);
    const eventId = props.match.params.eventId;
    

    useEffect(() => {
        axios
            .get(`http://localhost:8080/events/${eventId}`, { withCredentials: true })
            .then((res) => {
                setEventInfo(res.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [eventId])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventInfo((prevState => ({
            ...prevState,
            [name]: value
        })));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const start = date.format((new Date(eventInfo.start_time)), 'YYYY-MM-DD HH:mm');
        const end = date.format((new Date(eventInfo.end_time)), 'YYYY-MM-DD HH:mm');
        // console.log(start);
        // console.log(end);
        const updatedEvent = {
            name: eventInfo.name,
            start_time: start,
            end_time: end,
            description: eventInfo.description,
            restrictions: eventInfo.restrictions,
            fee: eventInfo.fee,
            image: eventInfo.image,
            category: eventInfo.category
        }   
        console.log(updatedEvent);
        axios
            .put(`http://localhost:8080/events/${eventId}`, {updatedEvent}, { withCredentials: true})
            .then((res) => {
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = (e) => {
        // e.preventDefault();
        axios
            .delete(`http://localhost:8080/events/${eventId}`, { withCredentials: true})
            .then((res)=> {
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err.response)
            });
    };
    
    if(!eventInfo) {
        return (
            <main>
                <p>Content is loading...</p>
            </main>
        )
    } else {
        const startTime = date.format((new Date(eventInfo.start_time)), 'YYYY-MM-DDTHH:mm');
        const endTime = date.format((new Date(eventInfo.end_time)), 'YYYY-MM-DDTHH:mm');
        
        return (
            <main>
                <h2>dummy content for now</h2>
                <form className="event-form" onSubmit={handleFormSubmit}>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={eventInfo.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="start_time">Start Time</label>
                        <input 
                            type="datetime-local" 
                            id="start_time" 
                            name="start_time" 
                            value={startTime} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="end_time">End Time</label>
                        <input 
                            type="datetime-local" 
                            id="end_time" 
                            name="end_time" 
                            value={endTime} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={eventInfo.description} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <h4 className="event-form__label">Age Restrictions</h4>
                        <label className="event-form__label" htmlFor="all_ages">All Ages</label>
                        <input 
                            type="radio" 
                            id="all_ages" 
                            name="restrictions" 
                            value="" 
                            checked={eventInfo.restrictions === ""} 
                            onChange={handleInputChange}
                        />
                        <label className="event-form__label" htmlFor="restricted">19+</label>
                        <input 
                            type="radio" 
                            id="restricted" 
                            name="restrictions" 
                            value="19+" 
                            checked={eventInfo.restrictions === "19+"} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="fee">Admission Cost</label>
                        <input 
                            type="number" 
                            id="fee" 
                            name="fee" 
                            step="0.01" 
                            min="0.00" 
                            max="10000" 
                            value={eventInfo.fee} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="event-form__row">
                        <label className="event-form__label" htmlFor="category">Cateogry</label>
                        <select 
                            type="text" 
                            id="category" 
                            name="category" 
                            value={eventInfo.category} 
                            onChange={handleInputChange}
                        >
                            <option value="Art">Art</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food & Drink">Food & Drink</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Music">Music</option>
                            <option value="Networking">Networking</option>
                            <option value="Sports">Sports</option>
                            <option value="Workshop">Workshop</option>
                        </select>
                    </div>
                    <Link to="/profile">Cancel</Link>
                    <button type="submit">Save Event</button>
                </form>
                <button type="button" onClick={handleDelete}>Delete</button>
            </main>
        )
    }
}

export default EditEvent;