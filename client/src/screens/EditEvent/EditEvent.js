import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import date from 'date-and-time';
import Header from './../../components/Header';
import Modal from './../../components/Modal';
import './EditEvent.scss';


function EditEvent(props) {
    const [ eventInfo, setEventInfo ] = useState(null);
    const [ modalStatus, setModalStatus] = useState(false);
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

    const isFormValid = () => {
        if (
            !eventInfo.name.trim() ||
            !eventInfo.start_time.trim() ||
            !eventInfo.end_time.trim() ||
            !eventInfo.category.trim()
        ) {
            return false;
        } else if (eventInfo.start_time >= eventInfo.end_time) {
            return false;
        } 
        return true;
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const start = date.format((new Date(eventInfo.start_time)), 'YYYY-MM-DD HH:mm');
        const end = date.format((new Date(eventInfo.end_time)), 'YYYY-MM-DD HH:mm');
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
        axios
            .put(`http://localhost:8080/events/${eventId}`, {updatedEvent}, { withCredentials: true})
            .then((res) => {
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const toggleModal = (e) => {
        e.preventDefault();
        setModalStatus(!modalStatus);
    }

  
    
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
            <div>
                <Header {...props}/>
                <main className="edit-event">
                    <form className="edit-event-form" onSubmit={handleFormSubmit}>
                    <h1 className="edit-event__title">Edit Your Event</h1>
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="name">Name*</label>
                            <input 
                                className="edit-event-form__input"
                                type="text" 
                                id="name" 
                                name="name" 
                                value={eventInfo.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="start_time">Start Time*</label>
                            <input 
                                className="edit-event-form__input edit-event-form__input--datetime"
                                type="datetime-local" 
                                id="start_time" 
                                name="start_time" 
                                value={startTime} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="end_time">End Time*</label>
                            <input 
                                className="edit-event-form__input edit-event-form__input--datetime"
                                type="datetime-local" 
                                id="end_time" 
                                name="end_time" 
                                value={endTime} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="description">Description</label>
                            <textarea 
                                className="edit-event-form__input edit-event-form__input--textarea"
                                id="description" 
                                name="description" 
                                value={eventInfo.description} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-event-form__row">
                            <h4 className="edit-event-form__label">Age Restrictions*</h4>
                            <div className="edit-event-form__wrapper">
                                <div className="edit-event-form__box">
                                    <label className="edit-event-form__label--radio" htmlFor="all_ages">All Ages</label>
                                    <input 
                                        className="edit-event-form__input edit-event-form__input--radio"
                                        type="radio" 
                                        id="all_ages" 
                                        name="restrictions" 
                                        value="" 
                                        checked={eventInfo.restrictions === ""} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="edit-event-form__box">
                                    <label className="edit-event-form__label--radio" htmlFor="restricted">19+</label>
                                    <input 
                                        className="edit-event-form__input edit-event-form__input--radio"
                                        type="radio" 
                                        id="restricted" 
                                        name="restrictions" 
                                        value="19+" 
                                        checked={eventInfo.restrictions === "19+"} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="fee">Admission Cost</label>
                            <input 
                                className="edit-event-form__input"
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
                        <div className="edit-event-form__row">
                            <label className="edit-event-form__label" htmlFor="category">Cateogry*</label>
                            <select 
                                className="edit-event-form__input"
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
                        <div className="edit-event-form__actions">
                            <button className="edit-event-form__delete" onClick={toggleModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="edit-event-form__svg">
                                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#C94515" className="edit-event-form__icon"/>
                                </svg>
                            </button>
                            <Link to="/profile" className="edit-event-form__button edit-event-form__button--cancel">Cancel</Link>
                            <button 
                                type="submit" 
                                className="edit-event-form__button"
                                disabled={!isFormValid()}
                                >
                                    Save Event
                            </button>
                        </div>
                    </form>
                    {modalStatus ? <Modal {...props} modalStatus={modalStatus} setModalStatus={setModalStatus}/> : null}
                </main>
            </div>
        )
    }
}

export default EditEvent;