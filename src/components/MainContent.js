import { useState, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import CaughtTotalContainer from './CaughtTotalContainer';
import CritterMenuButton from './CritterMenuButton';
import CritterDisplay from './CritterDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList, faFish, faEye, faEyeSlash, faMarker } from '@fortawesome/free-solid-svg-icons'

function MainContent({
  critterIcons,
  modalIcons,
}) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const [hemisphere, setHemisphere] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('hemisphere'));
    return savedValue || 'southern';
  })
  const [customMonth, setCustomMonth] = useState(1);
  const [customTime, setCustomTime] = useState(1);
  //Date and critter data
  const [currentDateData, setCurrentDateData] = useState(new Date());
  const [bugsData, setBugsData] = useState();
  const [fishData, setFishData] = useState();
  const [seaData, setSeaData] = useState();
  //view modes and filters
  const [activeCritter, setActiveCritter] = useState('bugs')
  const [caughtMode, setCaughtMode] = useState(false);
  const [showCaught, setShowCaught] = useState(true)
  const [allYear, setAllYear] = useState(false);
  const [disableTime, setDisableTime] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  //critter caught lists
  const [bugsCaught, setBugsCaught] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('bugsCaught'));
    return savedValue || [];
  });
  const [fishCaught, setFishCaught] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('fishCaught'));
    return savedValue || [];
  });
  const [seaCaught, setSeaCaught] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('seaCaught'));
    return savedValue || [];
  });

  useEffect(() => {
    localStorage.setItem('hemisphere', JSON.stringify(hemisphere));
    localStorage.setItem('bugsCaught', JSON.stringify(bugsCaught));
    localStorage.setItem('fishCaught', JSON.stringify(fishCaught));
    localStorage.setItem('seaCaught', JSON.stringify(seaCaught));
  }, [hemisphere, bugsCaught, fishCaught, seaCaught])

  useEffect(() => {
    async function fetchBugsData() {
      const response = await fetch(`https://acnhapi.com/v1/bugs/`, { mode: 'cors' });
      const critterData = await response.json();
      setBugsData(critterData);
    }
    async function fetchFishData() {
      const response = await fetch(`https://acnhapi.com/v1/fish/`, { mode: 'cors' });
      const critterData = await response.json();
      setFishData(critterData);
    }
    async function fetchSeaData() {
      const response = await fetch(`https://acnhapi.com/v1/sea/`, { mode: 'cors' });
      const critterData = await response.json();
      setSeaData(critterData);
    }
    fetchBugsData();
    fetchFishData();
    fetchSeaData();
  }, [])

  const resetStates = () => {
    setAllDay(false);
    setAllYear(false);
    setDisableTime(false);
    setCurrentDateData(new Date());
  }

  const toggleCaughtMode = () => {
    resetStates();
    setViewAll(false);
    setShowCaught(true);
    setCaughtMode(!caughtMode);
  }

  const toggleViewAll = () => {
    resetStates();
    setCaughtMode(false);
    setViewAll(!viewAll);
  }

  const viewCurrent = () => {
    resetStates();
    setViewAll(false);
  }

  return (
    <div className="main-content">
      <section className='top-menu'>
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
        {caughtMode && <CaughtTotalContainer
          critterIcons={critterIcons}
          bugsCaught={bugsCaught}
          fishCaught={fishCaught}
          seaCaught={seaCaught}
        />}
        {!viewAll && !caughtMode && <>
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
        </>}
      </section>
      <main className='critter-display-container'>
        <div className='mid-buttons-container'>
          <div className='critter-buttons-container'>
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'bugs'}
              critterIcon={critterIcons.bug}
            />
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'fish'}
              critterIcon={critterIcons.fish}
            />
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'sea'}
              critterIcon={critterIcons.sea}
            />
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
        <div className='mid-line'></div>
        <div className={`critter-display-content ${activeCritter === 'sea' ? 'sea-disp-content' : 'default-disp-content'}`}>
          <CritterDisplay
            activeCritter={activeCritter}
            bugsData={bugsData}
            fishData={fishData}
            seaData={seaData}
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
            currentDateData={currentDateData}
            customMonth={customMonth}
            customTime={customTime}
            allYear={allYear}
            disableTime={disableTime}
            allDay={allDay}
            modalIcons={modalIcons}
          />
        </div>
      </main>
    </div>
  );
}

export default MainContent;
