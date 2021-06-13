import './Sidebar.scss';

function Sidebar(props) {
    console.log(props);
    return (
        <section className="sidebar">
            <button className="sidebar__close-button">x</button>
            <ul className="sidebar__list">
                {props.markers.map((marker) => {
                    return (
                        <li key={marker.time} className="sidebar__list-item">
                            <div className="sidebar__list-left">
                                <img 
                                    src="" 
                                    alt="Icon" 
                                    className="sidebar__icon"
                                />
                            </div>
                            <div className="sidebar__right">
                                <p className="sidebar__description">Latitude: {marker.lat}, longitude: {marker.lng}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Sidebar;