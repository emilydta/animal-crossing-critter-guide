import { useState, useEffect } from "react";
import checkAvailability from "./utils/checkAvailability";
import CritterModal from "./CritterModal";

function CritterDisplay({
    activeCritter,
    bugsData,
    fishData,
    seaData,
    bugsCaught,
    fishCaught,
    seaCaught,
    setBugsCaught,
    setFishCaught,
    setSeaCaught,
    months,
    hemisphere,
    showCaught,
    caughtMode,
    viewAll,
    customMonth,
    customTime,
    allYear,
    disableTime,
    allDay,
    modalIcons,
}) {
    const [critterData, setCritterData] = useState(null);
    const [selectedCritter, setSelectedCritter] = useState(null);
    const [caughtList, setCaughtList] = useState([]);

    //remove overflow-y scroll when modal is open
    const htmlTag = document.getElementsByTagName('html')[0];
    selectedCritter ? htmlTag.classList.add('active-modal') : htmlTag.classList.remove('active-modal');

    const toggleCaught = (e) => {
        e.currentTarget.classList.toggle('caught');
        if (e.currentTarget.classList.contains('caught')) {
            setCaughtList([...caughtList, e.currentTarget.classList[1]])
            activeCritter === 'bugs' && setBugsCaught([...bugsCaught, e.currentTarget.classList[1]]);
            activeCritter === 'fish' && setFishCaught([...fishCaught, e.currentTarget.classList[1]]);
            activeCritter === 'sea' && setSeaCaught([...seaCaught, e.currentTarget.classList[1]]);
        }
        if (!e.currentTarget.classList.contains('caught')) {
            setCaughtList(caughtList.filter((critter) => { return critter !== e.currentTarget.classList[1] }));
            activeCritter === 'bugs' && setBugsCaught(bugsCaught.filter((critter) => { return critter !== e.currentTarget.classList[1] }));
            activeCritter === 'fish' && setFishCaught(fishCaught.filter((critter) => { return critter !== e.currentTarget.classList[1] }));
            activeCritter === 'sea' && setSeaCaught(seaCaught.filter((critter) => { return critter !== e.currentTarget.classList[1] }));

        }
    }

    const formatString = (string) => {
        const newString = string.replace(/_/g, ' ');
        const formattedString = newString.charAt(0).toUpperCase() + newString.slice(1);
        return formattedString;
    }

    const addUnavailableClassName = (critter) => {
        return !caughtMode ? checkAvailability(hemisphere, customMonth, customTime, allYear, disableTime, allDay, critter) : '';
    }


    useEffect(() => {
        async function fetchCritterData() {
            if (activeCritter === 'bugs') {
                setCritterData(bugsData);
            }
            if (activeCritter === 'fish') {
                setCritterData(fishData);
            }
            if (activeCritter === 'sea') {
                setCritterData(seaData);
            }
        }
        fetchCritterData();
    }, [activeCritter, bugsData])

    return (
        <div className="active-critter-display"
            style={{
                display: 'grid',
                gridTemplateRows: 'repeat(5, 1fr)',
                gridTemplateColumns: `repeat(${critterData && Object.keys(critterData).length / 5}, 1fr)`,
                gridAutoFlow: 'column',
            }}
        >
            {critterData && Object.entries(critterData).map((critter) => {
                return (
                    viewAll ? <div key={critter[1].id} className="entry-border">
                        <div className='tooltip'>
                            <p className={`tooltip-text`}>{formatString(critter[1]['file-name'])}</p>
                        </div>
                        <div
                            className={`critter-entry ${critter[1]['file-name']}
                            ${caughtList.includes(critter[1]['file-name']) && showCaught ? 'caught' : ''}`}
                            onClick={() => { setSelectedCritter(critter[1]) }}>
                            <img className="critter-entry-icon" src={critter[1].icon_uri}></img>
                        </div>
                    </div> :
                        <div key={critter[1].id} className="entry-border">
                            <div className='tooltip'>
                                <p className={`tooltip-text ${addUnavailableClassName(critter)}`}>{formatString(critter[1]['file-name'])}</p>
                            </div>
                            <div
                                className={
                                    `critter-entry ${critter[1]['file-name']} 
                                ${caughtList.includes(critter[1]['file-name']) && showCaught ? 'caught' : ''} 
                                ${addUnavailableClassName(critter)}`
                                }
                                onClick={caughtMode ? (e) => toggleCaught(e) : () => { setSelectedCritter(critter[1]) }}>
                                <img className="critter-entry-icon" src={critter[1].icon_uri}></img>
                            </div>
                        </div>
                )
            }
            )}
            {selectedCritter &&
                <CritterModal
                    activeCritter={activeCritter}
                    caughtList={caughtList}
                    setCaughtList={setCaughtList}
                    bugsCaught={bugsCaught}
                    fishCaught={fishCaught}
                    seaCaught={seaCaught}
                    setBugsCaught={setBugsCaught}
                    setFishCaught={setFishCaught}
                    setSeaCaught={setSeaCaught}
                    selectedCritter={selectedCritter}
                    setSelectedCritter={setSelectedCritter}
                    months={months}
                    formatString={formatString}
                    hemisphere={hemisphere}
                    customMonth={customMonth}
                    customTime={customTime}
                    modalIcons={modalIcons}
                />}
        </div>
    )

}

export default CritterDisplay;