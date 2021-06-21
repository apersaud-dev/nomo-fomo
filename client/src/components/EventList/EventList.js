import { Link } from 'react-router-dom';
import EventItems from './../EventItems';
import './EventList.scss';

function EventList(events) {
    if(events.events.length === 0) {
        return (
            <section>
                <h3>There are no events currently scheduled for your business</h3>
            </section>
        )
    } else {
        // filter out past events
        const filteredEvents = events.events.filter((event) => {
            const time = Date.now();
            const eventTime = new Date(event.end_time);
            return eventTime > time;
        })
        console.log(filteredEvents);
        
        // sort events by start time before mapping over them
        const sortedEvents = filteredEvents.sort((a, b) => {
            return (a.start_time < b.start_time) ? -1 : ((a.start_time > b.start_time) ? 1 : 0);
        })
        
        return (
            <section className="events-container">
                <h2 className="events-container__title">Your Upcoming Events:</h2>
                <Link to="/create-event" className="events-container__create">Create New Event</Link>
                <ul className="event-list">
                    {sortedEvents.map((event, index) => {
                        return (
                            <EventItems key={event.id} eventData={event} number={index+1}/>
                        )
                    })}
                </ul>
            </section>
        )
    }
}

export default EventList;