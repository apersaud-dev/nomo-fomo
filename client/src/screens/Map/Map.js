import { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import useSuperCluster from 'use-supercluster';
import MapStyle from './MapStyle';
import Drawer from './../../components/Drawer';
import './Map.scss';

function Map() {
    // map setup
    const mapRef = useRef();
    const [zoom, setZoom] = useState(18);
    const [bounds, setBounds] = useState(null);
    const [markers, setMarkers] = useState([]);
    const Marker = ({children}) => children;

    // load and format data
    useEffect(() => {
        axios
            .get('http://localhost:8080/events')
            .then((res) => {
                setMarkers(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, []);

    const points = markers.map((marker) => ({
        type: "Feature",
        properties: {
            cluster: false,
            eventId: marker.display_id,
            category: marker.category
        },
        geometry: { type: "Point", coordinates: [marker.businesses.longitude, marker.businesses.latitude] }
    }));

    const { clusters, supercluster } = useSuperCluster({
        points, 
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    });

    // const markerClickHandler = (e) => {
    //     e.preventDefault();
    //     axios
    //         .get(`http://localhost:8080/events/${e.target.id}`)
    //         .then((res)=> {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         });

    // }
   

    if(!markers) {
        return (
            <main>
                <div>Content is loading...</div>
            </main>
        )
    } else {
        // console.log(bounds);
        return (
            <main className="screen">
                <header className="screen__header"></header>
                <div className="map-container">
                    <div className="map" 
                    // style={{ height: "100vh", width: "100% "}} 
                    >
                        <GoogleMapReact 
                            options={MapStyle}
                            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                            defaultCenter={{lat: 43.64513929518148, lng: -79.39709079559223}}
                            defaultZoom={18}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map }) => {
                                mapRef.current = map;
                            }}
                            onChange={({ zoom, bounds }) => {
                                setZoom(zoom);
                                setBounds([
                                    bounds.nw.lng,
                                    bounds.se.lat,
                                    bounds.se.lng, 
                                    bounds.nw.lat
                                ])
                            }}
                        >
                            {clusters.map(cluster => {
                                const [ longitude, latitude ] = cluster.geometry.coordinates;
                                const { cluster: isCluster, point_count: pointCount, cluster_id } = cluster.properties;
                                if (isCluster) {
                                    return (
                                    
                                        <Marker key={cluster_id} lat={latitude} lng={longitude}>
                                            <button 
                                                className="cluster"
                                                style={ zoom > 16 ? 
                                                    
                                                    {
                                                    width: `${10 + (pointCount / points.length) * 100}px`,
                                                    height: `${10 + (pointCount / points.length) * 100}px`
                                                } : {
                                                    width: `${10 + (pointCount / points.length) * 50}px`,
                                                    height: `${10 + (pointCount / points.length) * 50}px`
                                                }
                                                }
                                                onClick={() => {
                                                    const expansionZoom = Math.min(
                                                        supercluster.getClusterExpansionZoom(cluster_id),
                                                        20
                                                    );
                                                    mapRef.current.setZoom(expansionZoom);
                                                    mapRef.current.panTo({ lat: latitude, lng: longitude})
                                                }}
                                            >
                                                {pointCount}
                                            </button>
                                        </Marker>
                                    )
                                }

                                return (
                                    <Marker key={cluster.properties.eventId} lat={latitude} lng={longitude}>
                                        <button 
                                            className="map__marker" id={cluster.properties.eventId} 
                                            // onClick={markerClickHandler}
                                            style={ zoom > 17 ? { width: "50px", height: "50px"} : {width: "25px", height: "25px"}
                                            }
                                        >
                                        </button>
                                    </Marker> 
                                )
                            })}
                            
                        </GoogleMapReact>
                    </div>
                    <Drawer mapRef={mapRef} markers={markers} bounds={bounds}/>
                </div>
                
                <footer className="screen__footer"></footer>
            </main>
        )
    }
}

export default Map;