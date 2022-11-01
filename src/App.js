import './App.css';
import MainContent from './components/MainContent';
import critterIcons from './images/critterIcons/critterIcons';
import modalIcons from './images/modalIcons/modalIcons.js';

function App() {
  return (
    <MainContent
      critterIcons={critterIcons}
      modalIcons={modalIcons}
    />
  )
}

export default App;