import './App.css';
import './components/stylesheets/LoadingStyles.css';
import { useState, useEffect } from 'react';
import MainContent from './components/MainContent';
import critterIcons from './icons/critterIcons/critterIcons';
import modalIcons from './icons/modalIcons/modalIcons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('theme'));
    return savedValue || 'default';
  });
  const [bugsData, setBugsData] = useState();
  const [fishData, setFishData] = useState();
  const [seaData, setSeaData] = useState();

  //Light mode/dark mode CSS color variables
  useEffect(() => {
    let lightMode = () => {
      document.documentElement.style.setProperty('--bg-primary', '#ffebcd');
      document.documentElement.style.setProperty('--bg-secondary', '#342e2e');
    }
    
    let darkMode = () => {
      document.documentElement.style.setProperty('--bg-primary', '#342e2e');
      document.documentElement.style.setProperty('--bg-secondary', '#e5d4ba');
    }

    //Check for user's preferred color scheme on first visit and set light/dark mode accordingly
    if (theme === 'default') {
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme('light');
        lightMode();
      } else
        setTheme('dark');
      darkMode();
    }
    //Switch settings
    if (theme === 'light') {
      lightMode();
    }

    if (theme === 'dark') {
      darkMode();
    }
  }, [theme]);

  useEffect(() => {
    async function fetchBugsData() {
      const response = await fetch(`https://api.acnhcritterguide.com/v1a/bugs.json`, { mode: 'cors' });
      const critterData = await response.json();
      setBugsData(critterData);
    }
    async function fetchFishData() {
      const response = await fetch(`https://api.acnhcritterguide.com/v1a/fish.json`, { mode: 'cors' });
      const critterData = await response.json();
      setFishData(critterData);
    }
    async function fetchSeaData() {
      const response = await fetch(`https://api.acnhcritterguide.com/v1a/sea.json`, { mode: 'cors' });
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
        theme={theme}
        setTheme={setTheme}
        critterIcons={critterIcons}
        modalIcons={modalIcons}
        bugsData={bugsData}
        fishData={fishData}
        seaData={seaData}
      />
    }
  }

  return (
    <>
      {appContent()}
    </>
  )
}

export default App;