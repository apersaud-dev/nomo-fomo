import { Link } from 'react-router-dom';
import date from 'date-and-time';
import './EventItems.scss';

function EventItems(props) {
    const { display_id, end_time, image, name, start_time, description } = props.eventData;
    const eventDate = date.format((new Date(start_time)), 'ddd, MMM DD YYYY');
    const startTime = date.format((new Date(start_time)), 'hh:mm A');
    const endTime = date.format((new Date(end_time)), 'hh:mm A');
    

    return (
        <li>
            <Link to={`/edit/${display_id}`} className="event">
            <img src={image === "" ? "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" : image} className="event__image" alt="Event"/>
            <h3 className="event__name">Event: {name}</h3>
            <h4 className="event__date">Date: {eventDate}</h4>
            <p className="event__time">Time: {startTime} - {endTime}</p>
            <p className="event__description">{description}</p> 
            <div className="event__edit-box">
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" className="event__edit-icon">
                    <path d="M14.076 5.924L3 17 3 21 7 21 18.076 9.924z"/>
                    <path d="M17.086 2.379H20.5V8.036H17.086z" transform="rotate(-45.001 18.793 5.207)"/>
                </svg>
            </div>
            </Link>
        </li>
    )
}

export default EventItems;