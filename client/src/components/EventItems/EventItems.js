import { Link } from 'react-router-dom';
import './EventItems.scss';

function EventItems(props) {
    const { display_id, end_time, image, name, start_time } = props.eventData;
    const date = (new Date(start_time)).toDateString();
    const start = (new Date(start_time)).toLocaleTimeString();
    const end = (new Date(end_time)).toLocaleTimeString();
    return (
        <li className="event">
            <p className="event__number">{props.number}.</p>
            <h3 className="event__name">{name}</h3>
            <h4 className="event__date">{date}</h4>
            <p className="event__start">{start}</p>
            <p className="event__end">{end}</p>
            <Link to={`/edit/${display_id}`} className="event__edit">
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" className="event__edit-icon">
                    <path d="M14.076 5.924L3 17 3 21 7 21 18.076 9.924z"/>
                    <path d="M17.086 2.379H20.5V8.036H17.086z" transform="rotate(-45.001 18.793 5.207)"/>
                </svg>
            </Link>
        </li>
    )
}

export default EventItems;