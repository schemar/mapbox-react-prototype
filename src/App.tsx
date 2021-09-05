import Map from './map/Map';

function App() {
    const sanFrancisco = {
        lat: -122.4242,
        lng: 37.7537,
        zoom: 12,
    };

    return (
        <div className="app-container">
            <Map startingLocation={sanFrancisco} />
        </div>
    );
}

export default App;
