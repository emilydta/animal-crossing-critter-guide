import { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import HelpCard from './HelpCard';
import CritterDisplay from './CritterDisplay';
import CritterMenuButton from './CritterMenuButton';
import CaughtTotalContainer from './CaughtTotalContainer';
import TimeDisplay from './TimeDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleQuestion, faTableList, faFish, faEyeSlash, faMarker, faMoon, faLightbulb } from '@fortawesome/free-solid-svg-icons'

function MainContent({
  theme,
  setTheme,
  critterIcons,
  modalIcons,
  bugsData,
  fishData,
  seaData
}) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const [hemisphere, setHemisphere] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('hemisphere'));
    return savedValue || 'southern';
  })
  const [customMonth, setCustomMonth] = useState(1);
  const [customTime, setCustomTime] = useState(1);
  const [currentDateData, setCurrentDateData] = useState(new Date());

  //view modes and filters
  const [infoCardActive, setInfoCardActive] = useState(false);
  const [helpCardActive, setHelpCardActive] = useState(false);
  const [activeCritter, setActiveCritter] = useState('bugs')
  const [caughtMode, setCaughtMode] = useState(false);
  const [showCaught, setShowCaught] = useState(true)
  const [allYear, setAllYear] = useState(false);
  const [disableTime, setDisableTime] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  //critter caught lists
  const [caughtList, setCaughtList] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('caughtList'));
    return savedValue || [];
  });
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

  //Add overflow-y: none on body when infoCard is active
  useEffect(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    infoCardActive || helpCardActive ? htmlTag.classList.add('active-modal') : htmlTag.classList.remove('active-modal');
  }, [infoCardActive, helpCardActive]);

  //Save data to local storage
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    localStorage.setItem('hemisphere', JSON.stringify(hemisphere));
    localStorage.setItem('caughtList', JSON.stringify(caughtList));
    localStorage.setItem('bugsCaught', JSON.stringify(bugsCaught));
    localStorage.setItem('fishCaught', JSON.stringify(fishCaught));
    localStorage.setItem('seaCaught', JSON.stringify(seaCaught));
  }, [hemisphere, caughtList, bugsCaught, fishCaught, seaCaught, theme])

  const addActiveClassToCurrentButton = () => {
    let currentMonth = Number(currentDateData.toLocaleDateString('en-US',
      {
        month: 'numeric'
      }))
    let currentTime = Number(currentDateData.toLocaleString('en-US',
      {
        hour: 'numeric',
        hour12: false
      }))

    if (!viewAll && !allDay && !disableTime && !allYear) {
      if (currentTime == 24 && customTime == 0 && currentMonth == customMonth ||
        currentTime == customTime && currentMonth == customMonth) {
        return 'active';
      }
    } else return '';
  }

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

  const markAllCaught = () => {
    if (activeCritter === 'bugs') {
      const allBugs = Object.entries(bugsData).map((bug) => bug[1]['file-name']);
      setBugsCaught(allBugs);
      setCaughtList([...fishCaught, ...seaCaught, ...allBugs])
    }
    if (activeCritter === 'fish') {
      const allFish = Object.entries(fishData).map((fish) => fish[1]['file-name']);
      setFishCaught(allFish);
      setCaughtList([...bugsCaught, ...seaCaught, ...allFish])
    }
    if (activeCritter === 'sea') {
      const allSea = Object.entries(seaData).map((sea) => sea[1]['file-name']);
      setSeaCaught(allSea);
      setCaughtList([...bugsCaught, ...fishCaught, ...allSea])
    }
  }

  const clearAllCaught = () => {
    if (activeCritter === 'bugs') {
      setBugsCaught([]);
      setCaughtList([...fishCaught, ...seaCaught])
    }
    if (activeCritter === 'fish') {
      setFishCaught([]);
      setCaughtList([...bugsCaught, ...seaCaught])
    }
    if (activeCritter === 'sea') {
      setSeaCaught([]);
      setCaughtList([...bugsCaught, ...fishCaught])
    }
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
      <div className='top-buttons-container'>
        <button aria-label='info-card' className='info-card-button' onClick={() => setInfoCardActive(true)}>{<><FontAwesomeIcon icon={faCircleInfo} /></>}</button>
        <button aria-label='help-card' className='help-card-button' onClick={() => setHelpCardActive(true)}>{<><FontAwesomeIcon icon={faCircleQuestion} /></>}</button>
        <button aria-label={theme === 'light' || theme === 'default'  ? 'toggle-dark-mode' : 'toggle-light-mode'} className='theme-button active' onClick={() => setTheme((prev) => prev === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <><FontAwesomeIcon icon={faMoon} /></> : <><FontAwesomeIcon icon={faLightbulb} /></>}</button>
      </div>
      {
        infoCardActive && <InfoCard
          infoCardActive={infoCardActive}
          setInfoCardActive={setInfoCardActive}
        />
      }
      {
        helpCardActive && <HelpCard
          helpCardActive={helpCardActive}
          setHelpCardActive={setHelpCardActive}
        />
      }
      <main className='critter-display-container'>
        <div className={`critter-display-content ${activeCritter === 'sea' ? 'sea-disp-content' : 'default-disp-content'}`}>
          <CritterDisplay
            theme={theme}
            activeCritter={activeCritter}
            bugsData={bugsData}
            fishData={fishData}
            seaData={seaData}
            caughtList={caughtList}
            bugsCaught={bugsCaught}
            fishCaught={fishCaught}
            seaCaught={seaCaught}
            setCaughtList={setCaughtList}
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
        <div className='mid-buttons-container'>
          <div className='critter-buttons-container'>
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'bugs'}
              critterIcon={critterIcons.bug}
              alt='bugs'
            />
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'fish'}
              critterIcon={critterIcons.fish}
              alt='fish'
            />
            <CritterMenuButton
              activeCritter={activeCritter}
              setActiveCritter={setActiveCritter}
              critter={'sea'}
              critterIcon={critterIcons.sea}
              alt='sea-creatures'
            />
          </div>
          <div className='clear-mark-buttons-container'>
            {caughtMode && <>
              <button type="button"
                className="mark-all-caught"
                onClick={() => markAllCaught()}>+ All
              </button>
              <button type="button"
                className="clear-all-caught"
                onClick={() => clearAllCaught()}>-- All
              </button>
            </>}
          </div>
          <div className='caught-buttons-container'>
            {caughtMode && <button type="button"
              className="caught-mode-done-button"
              onClick={() => toggleCaughtMode()}>
              Done
            </button>}
            {!caughtMode && <button type="button"
              className="caught-mode-button"
              onClick={() => toggleCaughtMode()}>{<><FontAwesomeIcon icon={faMarker} /> Caught</>}
            </button>}

            {!caughtMode && <button type="button"
              className={`toggle-caught-button ${!showCaught ? 'active' : ''}`}
              onClick={() => setShowCaught(!showCaught)}>{<><FontAwesomeIcon icon={faEyeSlash} /> Caught</>}
            </button>}
          </div>
        </div>
        <div className='mid-line'></div>
        <section className='menu-container'>
          {!caughtMode && <div className='all-current-buttons-container'>
            <button type='button'
              className={`view-all-button ${viewAll ? 'active' : ''}`}
              onClick={() => toggleViewAll()}>
              {<span><FontAwesomeIcon icon={faTableList} /> All</span>}
            </button>
            <button type='button'
              className={`view-current-button ${addActiveClassToCurrentButton()}`}
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
            setActiveCritter={setActiveCritter}
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
      </main>
    </div>
  );
}

export default MainContent;
