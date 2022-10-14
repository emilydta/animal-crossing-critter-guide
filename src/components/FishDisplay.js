import { useState, useEffect } from "react";

function FishDisplay(props) {
    const [fishData, setFishData] = useState(null);
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
                    <div key={fish[1].id} className='fish_icon'>
                        <img src={fish[1].icon_uri}></img>
                    </div>
                )
            }
            ) : null}
        </div>
    )
}

export default FishDisplay;