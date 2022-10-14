import './App.css';
import FishDisplay from './components/FishDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        CRITTER GUIDE
      </header>
      <div className='critter-display'>
        <FishDisplay />
      </div>
    </div>
  );
}

export default App;
