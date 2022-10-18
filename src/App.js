import { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import FishDisplay from './components/FishDisplay';

function App() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const [hemisphere, setHemisphere] = useState('southern')
  const [currentDateData, setCurrentDateData] = useState(new Date());
  const [customMonth, setCustomMonth] = useState(1);
  const [customTime, setCustomTime] = useState(1);
  //view modes
  const [caughtMode, setCaughtMode] = useState(false);
  const [allYear, setAllYear] = useState(false);
  const [disableTime, setDisableTime] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const toggleCaughtMode = () => {
    setCaughtMode(!caughtMode);
  }

  return (
    <div className="App">
      <header className="App-header">
        CRITTER GUIDE
      </header>
      <section className='settings-section'>
        <TimeDisplay
          months={months}
          times={times}
          currentDateData={currentDateData}
          customMonth={customMonth}
          customTime={customTime}
          allYear={allYear}
          disableTime={disableTime}
          allDay={allDay}
          setCustomMonth={setCustomMonth}
          setCustomTime={setCustomTime}
          setAllYear={setAllYear}
          setDisableTime={setDisableTime}
          setAllDay={setAllDay}

        />
        <div className='hemisphere-buttons'>
          Hemisphere:
          <button className={`southern-hemisphere-button ${hemisphere === 'southern' ? 'active' : ''}`} onClick={() => setHemisphere('southern')}>Southern</button>
          <button className={`northern-hemisphere-button ${hemisphere === 'northern' ? 'active' : ''}`} onClick={() => setHemisphere('northern')}>Northern</button>
        </div>
        <button type="button" className="caught-mode-button" onClick={() => toggleCaughtMode()}>{caughtMode ? 'Done' : 'Mark Caught'}</button>
      </section>
      <main className='critter-display-container'>
        <FishDisplay
          months={months}
          hemisphere={hemisphere}
          caughtMode={caughtMode}
          customMonth={customMonth}
          customTime={customTime}
          allYear={allYear}
          disableTime={disableTime}
          allDay={allDay}
        />
      </main>
    </div>
  );
}

export default App;
