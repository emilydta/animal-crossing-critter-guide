import { useEffect } from "react"
import './stylesheets/TimeDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock, faSun } from '@fortawesome/free-solid-svg-icons'

function TimeDisplay(
    {
        months,
        times,
        currentDateData,
        customMonth,
        customTime,
        allYear,
        disableTime,
        allDay,
        setCustomMonth,
        setCustomTime,
        setAllYear,
        setDisableTime,
        setAllDay
    }) {

    let currentMonth = Number(currentDateData.toLocaleDateString('en-US',
        {
            month: 'numeric'
        }))
    let currentTime = Number(currentDateData.toLocaleString('en-US',
        {
            hour: 'numeric',
            hour12: false
        }))

    useEffect(() => {
        setCustomMonth(currentMonth);
        setCustomTime(`${currentTime === 24 ? 0 : currentTime}`);
    }, [currentDateData])

    const toggleDisableTime = () => {
        if (allDay) {
            setAllDay(false)
            setDisableTime(true)
        }
        else { setDisableTime(!disableTime) }
    }

    const toggleAllDay = () => {
        if (disableTime) {
            setDisableTime(false)
            setAllDay(true)
        }
        else { setAllDay(!allDay) }
    }

    const timeDisplayText = () => {
        if (allDay) {
            return 'All Day'
        }
        if (disableTime) {
            return '-'
        }
        else return `${times[customTime]}:00`
    }

    return (
        <div className="time-date-container">
            <div className="time-date-content">
                <div className="date-display-container">
                    <p className="date-display">
                        {allYear ? 'All Year' : months[customMonth - 1]}
                    </p>
                    <div className="slider-container">
                        <label htmlFor='month-slider' className="slider-label">Month slider: </label>
                        <input disabled={allYear ? true : false} id='month-slider' type='range' min='1' max='12' value={customMonth} onChange={(e) => setCustomMonth(e.target.value)}></input>
                    </div>
                </div>
                <div className="time-display-container">
                    <p className="time-display">
                        {timeDisplayText()}
                    </p>
                    <div className="slider-container">
                        <label htmlFor='time-slider' className="slider-label">Time slider: </label>
                        <input disabled={allDay || disableTime ? true : false} id='time-slider' type='range' min='0' max='23' value={customTime} onChange={(e) => setCustomTime(e.target.value)}></input>
                    </div>
                </div>
            </div>
            <div className="mode-buttons">
                <button type='button'
                    className={`all-year-button ${allYear ? 'active' : ''}`}
                    onClick={() => setAllYear(!allYear)}>
                    {<span><FontAwesomeIcon icon={faCalendarDays} /></span>} All Year
                </button>
                <button type='button'
                    className={`all-day-button ${allDay ? 'active' : ''}`}
                    onClick={() => toggleAllDay()}>
                    {<span><FontAwesomeIcon icon={faSun} /></span>} All Day
                </button>
                <button type='button'
                    className={`disable-time-button ${disableTime ? 'active' : ''}`}
                    onClick={() => toggleDisableTime()}>
                    {<span><FontAwesomeIcon icon={faClock} /></span>} Disable Time
                </button>
            </div>
        </div>
    )
}

export default TimeDisplay;