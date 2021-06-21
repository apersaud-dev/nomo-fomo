import { Link } from 'react-router-dom';
import './EventsHeader.scss';

function EventsHeader() {
    return (
        <section className="events-header">
            <div className="events-header__container">
                <div className="events-header__title-box">
                    <h2 className="events-header__title">Your Upcoming Events</h2>
                    <Link to="/create-event" className="events-header__create">Create Event</Link>
                </div>
                <div className="events-header__headings">
                    <div className="events-header__label--blank"></div>
                    <h3 className="events-header__label events-header__label--name">Name</h3>
                    <h3 className="events-header__label events-header__label--date">Date</h3>
                    <h3 className="events-header__label events-header__label--time">Start</h3>
                    <h3 className="events-header__label events-header__label--time">End</h3>
                    <h3 className="events-header__label events-header__label--edit">Edit</h3>
                </div>
            </div>
        </section>
    )
}

export default EventsHeader;