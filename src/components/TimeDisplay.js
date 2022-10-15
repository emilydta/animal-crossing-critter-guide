import { useState, useEffect } from "react"
import './stylesheets/TimeDisplay.css'

function TimeDisplay(props) {
    const [dateData, setDateData] = useState(new Date());
    useEffect(() => {
        setInterval(() => setDateData(new Date()), 30000);
    }, [])

    return (
        <div className="time-date-container">
            <p className="date-display">
                {dateData.toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
            <p className="time-display">
            {dateData.toLocaleString(undefined, {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: 'true'
                })}
            </p>
        </div>
    )
}

export default TimeDisplay;