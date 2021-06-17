import EventItems from './../EventItems';
import './EventList.scss';

function EventList(events) {
    // console.log(events.events);
    if(events.events.length === 0) {
        return (
            <section>
                <h3>No events are currently scheduled</h3>
            </section>
        )
    } else {
        return (
            <section>
                <ul>
                    {events.events.map((event) => {
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