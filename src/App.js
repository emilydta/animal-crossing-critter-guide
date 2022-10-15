import { useState } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import FishDisplay from './components/FishDisplay';

function App() {
  const [caughtMode, setCaughtMode] = useState(false);

  const toggleCaughtMode = () => {
    setCaughtMode(!caughtMode);
  }

  return (
    <div className="App">
      <header className="App-header">
        CRITTER GUIDE
      </header>
      <TimeDisplay />
      <div className='critter-display'>
        <button type="button" className="caught-mode-button" onClick={() => toggleCaughtMode()}>{caughtMode ? 'Done' : 'Mark Caught'}</button>
        <FishDisplay
          caughtMode={caughtMode}
        />
      </div>
    </div>
  );
}

export default App;
