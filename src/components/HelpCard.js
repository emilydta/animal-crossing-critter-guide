import './stylesheets/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleQuestion, faTableList, faFish, faEyeSlash, faMarker, faMoon, faLightbulb, faCalendarDays, faClock, faSun } from '@fortawesome/free-solid-svg-icons';


function HelpCard({
    helpCardActive,
    setHelpCardActive
}) {

    return (
        <>
            <div className="card-container">
                <div className='card-overlay' onClick={() => setHelpCardActive(false)}></div>
                <div className='help-card-content-wrapper'>
                    <div className='help-card-content'>
                        <div className="close-card-container">
                            <button type="button" className="close-card" onClick={() => setHelpCardActive(false)}>X</button>
                        </div>
                        <h1 className="card-heading"> 🛠️ User Guide </h1>
                        <p className="icon-heading">Month and Time Sliders</p>
                        <p className="explanation">
                            The sliders display critters available in months from January to December, and times from 12am to 11pm. The time is displayed using {<a href='https://simple.wikipedia.org/wiki/24-hour_clock' target='_blank'><span> military time.</span></a>}
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faLightbulb} />/<FontAwesomeIcon icon={faMoon} /></>}</p>
                        <p className="explanation">
                            Light Mode and Dark Mode (respectively).
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faTableList} /> All</>}</p>
                        <p className="explanation">
                            Displays all critters regardless of their availability.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faFish} /> Current</>}</p>
                        <p className="explanation">
                            Displays critters that are currently available according to your device's time/date.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faCalendarDays} /> All Year</>}</p>
                        <p className="explanation">
                            Displays critters that are available throughout the entire year.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faSun} /> All Day</>}</p>
                        <p className="explanation">
                            Displays critters that are available throughout the entire day.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faClock} /> Disable Time</>}</p>
                        <p className="explanation">
                            Disables the time slider. Can be used to display critters that are available throughout the entire month (or year), without factoring in time/hour of availability.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faMarker} /> Caught</>}</p>
                        <p className="explanation">
                            Enables 'Caught Mode'. While 'Caught Mode' is enabled, the critter icons can be clicked to record their status as either caught or uncaught.
                            The '-- All' button marks all critters from the selected category (e.g. fish) as uncaught, whereas the '++ All' button marks all critters from the selected category as caught.
                        </p>
                        <p className="icon-heading">{<><FontAwesomeIcon icon={faEyeSlash} /> Caught</>}</p>
                        <p className="explanation">
                            Hides the caught status of critters displayed in the grid.
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpCard;