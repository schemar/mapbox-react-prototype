import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import './Map.css';

import mapboxgl, { GeoJSONSource, Map as MapboxMap } from 'mapbox-gl';
import accessToken from '../accessToken';

import pin from './notes/pin.png';
import Notes, { Note } from './notes/Notes';
import Popup from './notes/Popup';

mapboxgl.accessToken = accessToken;

interface MapProps {
    startingLocation: { lat: number; lng: number; zoom: number };
}

const Map: FunctionComponent<MapProps> = ({ startingLocation }) => {
    const mapContainer = useRef(null);
    const map = useRef(null) as React.MutableRefObject<MapboxMap | null>;

    const [lng, setLng] = useState<number>(startingLocation.lat);
    const [lat, setLat] = useState<number>(startingLocation.lng);
    const [zoom, setZoom] = useState<number>(startingLocation.zoom);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on('load', async () => {
            if (!map.current) {
                throw new Error('Component could not load map.');
            }

            map.current.loadImage(pin, (error, image) => {
                if (error) {
                    throw error;
                }
                if (!map.current) {
                    throw new Error('Component did not load map.');
                }

                if (!image) {
                    throw new Error('Can not load pin as image for map.');
                }
                if (!map.current.hasImage('note')) {
                    map.current.addImage('note', image);
                }

                map.current.addSource('notes', {
                    type: 'geojson',
                    // TODO: load data from local store
                    data: { type: 'FeatureCollection', features: [] },
                });
                map.current.addLayer({
                    id: 'notes',
                    type: 'symbol',
                    source: 'notes',
                    layout: { 'icon-image': 'note', 'icon-size': 0.5 },
                });
            });

            map.current.on('click', 'notes', (event) => {
                if (!event.features) {
                    return;
                }

                // Copy coordinates array.
                const coordinates = (
                    event.features[0].geometry as GeoJSON.Point
                ).coordinates.slice();

                const note: Note = event.features[0].properties! as Note;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] +=
                        event.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates as any)
                    .setHTML(renderToString(<Popup note={note} />))
                    .addTo(map.current!);
            });
        });
        // Run only on mount:
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!map.current) {
            return; // Wait for map to initialize.
        }

        map.current.on('move', () => {
            if (!map.current) {
                throw new Error(
                    'Map emitted move, but is not available in the map component\'s "onMove" event handler.',
                );
            }

            setLng(map.current.getCenter().lng);
            setLat(map.current.getCenter().lat);
            setZoom(map.current.getZoom());
        });
    });

    const updateNotesOnMap = (notes: Note[]): void => {
        while (!map.current!.loaded) {
            // Wait for map to load.
            // Better would be a non-blocking wait.
        }
        const notesAsGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
            type: 'FeatureCollection',
            features: notes.map((note: Note) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [note.lng, note.lat],
                },
                properties: { ...note },
            })),
        };

        (map.current!.getSource('notes') as GeoJSONSource).setData(
            notesAsGeoJSON,
        );
    };

    return (
        <>
            <div ref={mapContainer} className="map-container" />
            <Notes onChange={updateNotesOnMap} lat={lat} lng={lng} />
        </>
    );
};

export default Map;
