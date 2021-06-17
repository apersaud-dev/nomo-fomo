import { Link } from 'react-router-dom';
import './EventItems.scss';

function EventItems(props) {
    const { category, description, display_id, end_time, fee, id, image, name, restrictions, start_time } = props.eventData;
    const date = (new Date(start_time)).toDateString();
    const start = (new Date(start_time)).toLocaleTimeString();
    const end = (new Date(end_time)).toLocaleTimeString();
    // console.log(eventData);
    return (
        <li key={id} className="event">
            <div className="event__left">
                <img src={image} alt="Event image" className="event__image"/>
            </div>
            <div className="event__center">
                <div className="event__box">
                    <h3 className="event__name">{name}</h3>
                    <h4 className="event__date">{date}</h4>
                </div>
                <div className="event__box">
                    <p className="event__start">{start}</p>
                    <p className="event__end">{end}</p>
                </div>
            </div>
            <div className="event__left">
                <Link to="/edit-event" eventData={props}>Edit Event</Link>
            </div>

        </li>
    )
}

export default EventItems;