import { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import FishDisplay from './components/FishDisplay';

function App() {
  const [hemisphere, setHemisphere] = useState('southern')
  const [caughtMode, setCaughtMode] = useState(false);
  const [currentDateData, setCurrentDateData] = useState(new Date());
  const [customMonth, setCustomMonth] = useState(1);
  const [customTime, setCustomTime] = useState(1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const toggleCaughtMode = () => {
    setCaughtMode(!caughtMode);
  }

  return (
    <div className="App">
      <header className="App-header">
        CRITTER GUIDE
      </header>
      <TimeDisplay
        currentDateData={currentDateData}
        customMonth={customMonth}
        setCustomMonth={setCustomMonth}
        months={months}
        customTime={customTime}
        setCustomTime={setCustomTime}
        times={times}
      />
      <div className='hemisphere-buttons'>
      Hemisphere: 
        <button className={`southern-hemisphere-button ${hemisphere === 'southern' ? 'active' : ''}` } onClick={() => setHemisphere('southern')}>Southern</button>
        <button className={`northern-hemisphere-button ${hemisphere === 'northern' ? 'active' : ''}` } onClick={() => setHemisphere('northern')}>Northern</button>
      </div>
      <div className='critter-display'>
        <button type="button" className="caught-mode-button" onClick={() => toggleCaughtMode()}>{caughtMode ? 'Done' : 'Mark Caught'}</button>
        <FishDisplay
          hemisphere={hemisphere}
          caughtMode={caughtMode}
          customMonth={customMonth}
          customTime={customTime}
        />
      </div>
    </div>
  );
}

export default App;
