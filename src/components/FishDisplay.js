import { useState, useEffect } from "react";
import checkAvailability from "./checkAvailability";

function FishDisplay({ caughtMode, customMonth, customTime }) {
    const [fishData, setFishData] = useState(null);
    const [caughtList, setCaughtList] = useState([]);

    const toggleCaught = (e) => {
        e.currentTarget.classList.toggle('caught');
        if (e.currentTarget.classList.contains('caught')) {
            setCaughtList([...caughtList, e.currentTarget.classList[1]])
        }
        if (!e.currentTarget.classList.contains('caught')) {
            setCaughtList(caughtList.filter((fish) => { return fish !== e.currentTarget.classList[1] }));
        }
    }

    const formatString = (string) => {
        const newString = string.replace(/_/g, ' ');
        const formattedString = newString.charAt(0).toUpperCase() + newString.slice(1);
        return formattedString;
    }

    useEffect(() => {
        async function fetchFishData() {
            const response = await fetch(`https://acnhapi.com/v1/fish/`, { mode: 'cors' });
            const fishData = await response.json();
            setFishData(fishData);
        }
        fetchFishData();
    }, [])


    return (
        <div className="fish-display">
            {fishData ? Object.entries(fishData).map((fish) => {
                return (
                    <div key={fish[1].id} className="entry-border">
                        <div
                            className={
                                `fish-entry ${fish[1]['file-name']} 
                                ${caughtList.includes(fish[1]['file-name']) ? 'caught' : ''} 
                                ${!caughtMode ? checkAvailability(customMonth, customTime, fish) : ''}`
                            }
                            onClick={caughtMode ? (e) => toggleCaught(e) : null}>
                            <div className="tooltip">
                                <p className="tooltip-text">{formatString(fish[1]['file-name'])}</p>
                            </div>

                            <img className="fish-icon" src={fish[1].icon_uri}></img>
                        </div>
                    </div>

                )
            }
            ) : null}
        </div>
    )
}

export default FishDisplay;