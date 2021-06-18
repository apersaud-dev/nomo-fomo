import EventItems from './../EventItems';
import './EventList.scss';

function EventList(events) {
    if(events.events.length === 0) {
        return (
            <section>
                <h3>No events are currently scheduled</h3>
            </section>
        )
    } else {
        // sort events by start time before mapping over them
        const sortedEvents = events.events.sort((a, b) => {
            return (a.start_time < b.start_time) ? -1 : ((a.start_time > b.start_time) ? 1 : 0);
        })
        
        return (
            <section>
                <ul>
                    {sortedEvents.map((event) => {
                        return (
                            <EventItems key={event.id} eventData={event} />
                        )
                    })}
                </ul>
            </section>
        )
    }
}

export default EventList;