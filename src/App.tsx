import Map from './map/Map';

function App() {
    const sanFrancisco = {
        lat: -122.4242,
        lng: 37.7537,
        zoom: 12,
    };

    return <Map startingLocation={sanFrancisco} />;
}

export default App;
