import { useState, useEffect } from "react";
import checkAvailability from "./checkAvailability";

function FishDisplay({
    hemisphere,
    caughtMode,
    customMonth,
    customTime
}) {
    const [fishData, setFishData] = useState(null);
    const [selectedFish, setSelectedFish] = useState(null);
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
                    <div className="tooltip">
                                <p className="tooltip-text">{formatString(fish[1]['file-name'])}</p>
                            </div>
                        <div
                            className={
                                `fish-entry ${fish[1]['file-name']} 
                                ${caughtList.includes(fish[1]['file-name']) ? 'caught' : ''} 
                                ${!caughtMode ? checkAvailability(hemisphere, customMonth, customTime, fish) : ''}`
                            }
                            onClick={caughtMode ? (e) => toggleCaught(e) : () => { setSelectedFish(fish[1]) }}>
                            
                            <img className="fish-icon" src={fish[1].icon_uri}></img>
                        </div>
                    </div>

                )
            }
            ) : null}
            {selectedFish ?
                <div className="view-info-mode">
                    <h1 className="creature-name">{formatString(selectedFish['file-name'])}</h1>
                </div> : null}
        </div>
    )
}

export default FishDisplay;