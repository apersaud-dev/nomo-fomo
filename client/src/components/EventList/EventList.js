import EventItems from './../EventItems';
import './EventList.scss';

function EventList(events) {
    console.log(events);
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
                    <EventItems />
                </ul>
            </section>
        )
    }
}

export default EventList;