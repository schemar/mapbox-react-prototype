import { FunctionComponent, useEffect, useRef, useState } from 'react';
import './Map.css';

import mapboxgl from 'mapbox-gl';
import accessToken from '../accessToken';

mapboxgl.accessToken = accessToken;

interface mapProps {
    startingLocation: { lat: number; lng: number; zoom: number };
}

const Map: FunctionComponent<mapProps> = ({ startingLocation }) => {
    const mapContainer = useRef(null);
    const map = useRef(null) as React.MutableRefObject<any>;

    const [lng, setLng] = useState(startingLocation.lat);
    const [lat, setLat] = useState(startingLocation.lng);
    const [zoom, setZoom] = useState(startingLocation.zoom);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });
        // Run only on mount:
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!map.current) {
            return; // wait for map to initialize
        }
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

export default Map;
