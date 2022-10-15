import { useState, useEffect } from "react"
import './stylesheets/TimeDisplay.css'

function TimeDisplay(
    {
        currentDateData, 
        customMonth, 
        setCustomMonth, 
        customTime,
        setCustomTime,
        months,
        times,
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
        setCustomTime(currentTime);
    }, [])

    return (
        <div className="time-date-container">
            <p className="date-display">
                {months[customMonth-1]}
            </p>
            <div className="slider-container">
                <input id='month-slider' type='range' min='1' max='12' value={customMonth} onChange={(e) => setCustomMonth(e.target.value)}></input>
            </div>
            <p className="time-display">
            {`${times[customTime]}:00`}
            </p>
            <div className="slider-container">
                <input id='time-slider' type='range' min='0' max='23' value={customTime} onChange={(e) => setCustomTime(e.target.value)}></input>
            </div>
        </div>
    )
}

export default TimeDisplay;