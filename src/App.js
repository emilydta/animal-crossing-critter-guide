import { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import FishDisplay from './components/FishDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList, faFish } from '@fortawesome/free-solid-svg-icons'


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

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  }

  const viewCurrent = () => { return }

  return (
    <div className="App">
      <section className='settings-section'>
        <div className='top-section-buttons'>
          <button type='button'
            className={`view-all-button ${viewAll ? 'active' : ''}`}
            onClick={() => toggleViewAll()}>
            {<span><FontAwesomeIcon icon={faTableList} /> All</span>}
          </button>
          <button type='button'
            className={`view-current-button`}
            onClick={() => viewCurrent()}>
            {<span><FontAwesomeIcon icon={faFish} /> Current</span>}
          </button>
        </div>
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
          <h4>Hemisphere: </h4>
          <button className={`southern-hemisphere-button ${hemisphere === 'southern' ? 'active' : ''}`} onClick={() => setHemisphere('southern')}>Southern</button>
          <button className={`northern-hemisphere-button ${hemisphere === 'northern' ? 'active' : ''}`} onClick={() => setHemisphere('northern')}>Northern</button>
        </div>
        <div className='mid-section-buttons'>
          <button type="button"
            className="caught-mode-button"
            onClick={() => toggleCaughtMode()}>{caughtMode ? 'Done' : 'Mark Caught'}
          </button>
        </div>
      </section>
      <main className='critter-display-container'>
        <FishDisplay
          months={months}
          hemisphere={hemisphere}
          viewAll={viewAll}
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
