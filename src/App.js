import './App.css';
import './components/stylesheets/LoadingStyles.css';
import { useState, useEffect } from 'react';
import MainContent from './components/MainContent';
import critterIcons from './icons/critterIcons/critterIcons';
import modalIcons from './icons/modalIcons/modalIcons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [bugsData, setBugsData] = useState();
  const [fishData, setFishData] = useState();
  const [seaData, setSeaData] = useState();

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

  const appContent = () => {
    if (!bugsData || !fishData || !seaData) {
      return (
        <div className='loading-icon-container'>
          <FontAwesomeIcon className='loading-icon' icon={faCog} />
        </div>
      )
    } else {
      return <MainContent
      critterIcons={critterIcons}
      modalIcons={modalIcons}
      bugsData={bugsData}
      fishData={fishData}
      seaData={seaData}
    />}
  }

  return (
    <>
      {appContent()}
    </>
  )
}

export default App;