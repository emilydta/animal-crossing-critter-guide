import { useState, useEffect } from 'react';
import './App.css';
import TimeDisplay from './components/TimeDisplay';
import CritterDisplay from './components/CritterDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList, faFish, faEye, faEyeSlash, faMarker } from '@fortawesome/free-solid-svg-icons'
import bugIcon from './images/Bug_Icon.png'
import fishIcon from './images/Fish_Icon.png'
import seaCreatureIcon from './images/Sea_Creature_Icon.png'



function App() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const [hemisphere, setHemisphere] = useState('southern')
  const [currentDateData, setCurrentDateData] = useState(new Date());
  const [customMonth, setCustomMonth] = useState(1);
  const [customTime, setCustomTime] = useState(1);
  //view modes
  const [activeCritter, setActiveCritter] = useState('bugs')
  const [caughtMode, setCaughtMode] = useState(false);
  const [showCaught, setShowCaught] = useState(true)
  const [allYear, setAllYear] = useState(false);
  const [disableTime, setDisableTime] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  //critter caught lists
  const [bugsCaught, setBugsCaught] = useState([]);
  const [fishCaught, setFishCaught] = useState([]);
  const [seaCaught, setSeaCaught] = useState([]);

  const toggleCaughtMode = () => {
    setViewAll(false);
    setAllDay(false);
    setAllYear(false);
    setDisableTime(false);
    setCurrentDateData(new Date());
    setShowCaught(true);
    setCaughtMode(!caughtMode);
  }

  const toggleViewAll = () => {
    setCaughtMode(false);
    setViewAll(!viewAll);
    setAllDay(false);
    setAllYear(false);
    setDisableTime(false);
    setCurrentDateData(new Date());
  }

  const viewCurrent = () => {
    setViewAll(false);
    setAllDay(false);
    setAllYear(false);
    setDisableTime(false);
    setCurrentDateData(new Date());
  }

  return (
    <div className="App">
      <section className='top-section'>
        {!caughtMode && <div className='all-current-buttons-container'>
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
        </div>}
        {viewAll &&
          <div className="all-critters-heading-container">
            <p className="all-critters-heading">All Critters</p>
          </div>
        }
        {caughtMode &&
          <div className="caught-total-container">
            <h1 className="caught-total-heading">Caught</h1>
            <div className='caught-total-content'>
              <div className='critter-total'>
                <><img src={bugIcon} alt='bug-icon' className='critter-total-icon'></img> {`${bugsCaught.length} : 80`}</>
              </div>
              <div className='critter-total'>
                <><img src={fishIcon} alt='fish-icon' className='critter-total-icon'></img>{`${fishCaught.length} : 80`}</>
              </div>
              <div className='critter-total'>
                <><img src={seaCreatureIcon} alt='sea-creature-icon' className='critter-total-icon'></img>{`${seaCaught.length} : 40`}</>
              </div>
            </div>
          </div>
        }

        {!viewAll && !caughtMode ? <>
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
          <div className={`hemisphere-buttons`}>
            <h4>Hemisphere: </h4>
            <button className={`southern-hemisphere-button ${hemisphere === 'southern' ? 'active' : ''} `} onClick={() => setHemisphere('southern')}>Southern</button>
            <button className={`northern-hemisphere-button ${hemisphere === 'northern' ? 'active' : ''}`} onClick={() => setHemisphere('northern')}>Northern</button>
          </div>
        </> : null}
      </section>     
      <main className='critter-display-container'>
        <div className={`critter-buttons-container ${activeCritter === 'sea' ? 'sea-width-btn' : 'default-width-btn'}`}>
          <div className={`critter-button ${activeCritter === 'bugs' && 'critter-active'}`}
            onClick={() => setActiveCritter('bugs')}>
            <img
              className='critter-button-icon'
              src={bugIcon}
            >
            </img>
          </div>
          <div className={`critter-button ${activeCritter === 'fish' && 'critter-active'}`}
            onClick={() => setActiveCritter('fish')}>
            <img
              className='critter-button-icon'
              src={fishIcon}>
            </img>
          </div>
          <div className={`critter-button ${activeCritter === 'sea' && 'critter-active'}`}
            onClick={() => setActiveCritter('sea')}>
            <img
              className='critter-button-icon'
              src={seaCreatureIcon}>
            </img>
          </div>
          <div className='caught-buttons-container'>
          <button type="button"
            className="caught-mode-button"
            onClick={() => toggleCaughtMode()}>{caughtMode ? 'Done' : <><FontAwesomeIcon icon={faMarker} /> Caught</>}
          </button>

          {!caughtMode && <button type="button"
            className="toggle-caught-button"
            onClick={() => setShowCaught(!showCaught)}>{showCaught ? <><FontAwesomeIcon icon={faEyeSlash} /> Caught</> : <><FontAwesomeIcon icon={faEye} /> Caught</>}
          </button>}
        </div>
        </div>
        <div className={`critter-display-content ${activeCritter === 'sea' ? 'sea-disp-content' : 'default-disp-content'}`}>
          <CritterDisplay
            activeCritter={activeCritter}
            bugsCaught={bugsCaught}
            fishCaught={fishCaught}
            seaCaught={seaCaught}
            setBugsCaught={setBugsCaught}
            setFishCaught={setFishCaught}
            setSeaCaught={setSeaCaught}
            months={months}
            hemisphere={hemisphere}
            viewAll={viewAll}
            showCaught={showCaught}
            caughtMode={caughtMode}
            customMonth={customMonth}
            customTime={customTime}
            allYear={allYear}
            disableTime={disableTime}
            allDay={allDay}
          />
        </div>
      </main>
      </div>
  );
}

export default App;
