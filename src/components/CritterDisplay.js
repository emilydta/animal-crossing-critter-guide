import { useState, useEffect } from "react";
import checkAvailability from "./utils/checkAvailability";
import { formatCritterFileName } from "./utils/stringFormats";
import CritterModal from "./CritterModal";
import ProgressiveImage from "./ProgressiveImage";
import loadingIconSrc from '../icons/circle-notch-solid.png';

function CritterDisplay({
    activeCritter,
    bugsData,
    fishData,
    seaData,
    caughtList,
    bugsCaught,
    fishCaught,
    seaCaught,
    setCaughtList,
    setBugsCaught,
    setFishCaught,
    setSeaCaught,
    months,
    hemisphere,
    showCaught,
    caughtMode,
    viewAll,
    currentDateData,
    customMonth,
    customTime,
    allYear,
    disableTime,
    allDay,
    modalIcons,
}) {
    const [critterData, setCritterData] = useState(null);
    const [selectedCritter, setSelectedCritter] = useState(null);

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
                {/* Critter entries and tooltips must have 'critter[file-name]' as class[1] to allow for recording them in caught lists while !viewAll */ }
                return (
                    viewAll ? <div key={critter[1].id} className="entry-border">
                        <div className='tooltip' onClick={() => { setSelectedCritter(critter[1]) }}>
                            <p className={`tooltip-text`}>{formatCritterFileName(critter[1]['file-name'])}</p>
                        </div>
                        <div
                            className={
                                `critter-entry 
                                ${critter[1]['file-name']}
                                ${caughtList.includes(critter[1]['file-name']) && showCaught ? 'caught' : ''}`
                            }
                            onClick={() => { setSelectedCritter(critter[1]) }}>
                            <ProgressiveImage 
                                src={critter[1].icon_uri}
                                loadingIconSrc={loadingIconSrc}
                                imgClass="critter-entry-icon"
                                alt='critter-entry'
                            />
                           {/* { <img className="critter-entry-icon" src={loaded ? critter[1].icon_uri : ''} alt='critter-entry' onLoad={onLoad}></img>} */}
                        </div>
                    </div> :
                        <div key={critter[1].id} className="entry-border">
                            <div
                                className={
                                    `tooltip 
                                    ${critter[1]['file-name']}
                                    ${caughtList.includes(critter[1]['file-name']) && showCaught ? 'caught' : ''}`}
                                onClick={caughtMode ? (e) => toggleCaught(e) : () => { setSelectedCritter(critter[1]) }}>
                                <p className={`tooltip-text ${addUnavailableClassName(critter)}`}>{formatCritterFileName(critter[1]['file-name'])}</p>
                            </div>
                            <div
                                className={
                                    `critter-entry 
                                    ${critter[1]['file-name']} 
                                    ${caughtList.includes(critter[1]['file-name']) && showCaught ? 'caught' : ''} 
                                    ${addUnavailableClassName(critter)}`
                                }
                                onClick={caughtMode ? (e) => toggleCaught(e) : () => { setSelectedCritter(critter[1]) }}>
                                <ProgressiveImage 
                                src={critter[1].icon_uri}
                                loadingIconSrc={loadingIconSrc}
                                imgClass="critter-entry-icon"
                                alt='critter-entry'
                            />
                            </div>
                        </div>
                )
            }
            )}
            {
                selectedCritter &&
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
                    hemisphere={hemisphere}
                    currentDateData={currentDateData}
                    modalIcons={modalIcons}
                />
            }
        </div>
    )

}

export default CritterDisplay;