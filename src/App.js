import './App.css';

function App() {
    return (
        <div className="App">
            <p>The Desktop App to detect face reactions!</p>
            <video 
                id="video"
                width="720" 
                height="560" 
                autoPlay 
                muted
            >

            </video>
        </div>
    );
}

export default App;
