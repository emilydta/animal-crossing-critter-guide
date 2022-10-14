import { useState, useEffect } from "react";

function FishDisplay({ caughtMode }) {
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

    useEffect(() => {
        async function fetchFishData() {
            const response = await fetch(`https://acnhapi.com/v1/fish/`, { mode: 'cors' });
            const fishData = await response.json();
            console.log(fishData)
            setFishData(fishData);
        }
        fetchFishData();
    }, [])
    return (
        <div className="fish-display">
            {fishData ? Object.entries(fishData).map((fish) => {
                return (
                    <div key={fish[1].id} className="entry-border">
                        <div className={`fish-entry ${fish[1]['file-name']}`} onClick={caughtMode ? (e) => toggleCaught(e) : null}>
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