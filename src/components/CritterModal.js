import { useState } from "react";
import locationIconFinder from "./utils/locationIconFinder";
import shadowIconFinder from "./utils/shadowIconFinder";
import speedIconFinder from "./utils/speedIconFinder";
import './stylesheets/CritterModal.css'

import { capitaliseFirstLetter, formatCritterFileName } from "./utils/stringFormats";

function CritterModal({
    activeCritter,
    caughtList,
    setCaughtList,
    bugsCaught,
    fishCaught,
    seaCaught,
    setBugsCaught,
    setFishCaught,
    setSeaCaught,
    selectedCritter,
    setSelectedCritter,
    months,
    hemisphere,
    currentDateData,
    modalIcons,
}) {
    const [modalHemisphere, setModalHemisphere] = useState(hemisphere);
    const [critterImageVisible, setCritterImageVisible] = useState(false);

    //remove overflow-y scroll when modal is open
    const htmlTag = document.getElementsByTagName('html')[0];
    selectedCritter ? htmlTag.classList.add('active-modal') : htmlTag.classList.remove('active-modal');

    const setModalHemisphereButton = () => {
        if (modalHemisphere === 'southern') {
            return setModalHemisphere('northern');
        }
        if (modalHemisphere === 'northern') {
            return setModalHemisphere('southern');
        }
    }

    const displayCritterMonthAvailability = (critter) => {
        if (critter['availability']['month-southern'] === critter['availability']['month-northern']) {
            return <>
                <h4 className="modal-hem-heading">Both Hemispheres</h4>
                {monthAvailability(selectedCritter, 'southern')}
            </>
        } else return <>
            <>
                <button className="modal-hem-button" onClick={() => setModalHemisphereButton()}>{`${capitaliseFirstLetter(modalHemisphere)} Hemisphere`}</button>
                {monthAvailability(selectedCritter, modalHemisphere)}
            </>
        </>
    }

    const monthAvailability = (critter, hemisphere) => {
        let monthArray = critter['availability'][`month-array-${hemisphere}`];

        //check for multiple date ranges (e.g. months 3-5 && 9-11)
        if (critter['availability'][`month-${hemisphere}`].includes('&')) {
            //isolates numbers from strings and places them into a new array, then converts them from strings to numbers
            let rangeArrayStrings = critter['availability'][`month-${hemisphere}`].match(/\d+/g);
            let rangeArray = rangeArrayStrings.map(string => Number(string))
            if (critter['file-name'] === 'ladybug') {
                return <>
                    <p>{`${months[rangeArray[0] - 1]} - ${months[rangeArray[1] - 1]} &`}</p>
                    <p>{`${months[rangeArray[2] - 1]}`}</p>
                </>
            } else return <>
                <p>{`${months[rangeArray[0] - 1]} - ${months[rangeArray[1] - 1]} &`}</p>
                <p>{`${months[rangeArray[2] - 1]} - ${months[rangeArray[3] - 1]}`}</p>
            </>
        } else return <p>{`${months[monthArray[0] - 1]} - ${months[monthArray[monthArray.length - 1] - 1]}`}</p>
    }

    const modalCaughtStatus = () => {
        if (caughtList.includes(selectedCritter['file-name'])) {
            return 'Caught'
        } else return 'Uncaught'
    }

    const setCaught = (critter) => {
        if (caughtList.includes(critter)) {
            setCaughtList(caughtList.filter((c) => { return c !== critter }));
            activeCritter === 'bugs' && setBugsCaught(bugsCaught.filter((c) => { return c !== critter }));
            activeCritter === 'fish' && setFishCaught(fishCaught.filter((c) => { return c !== critter }));
            activeCritter === 'sea' && setSeaCaught(seaCaught.filter((c) => { return c !== critter }));
            return;
        }
        if (!caughtList.includes(critter)) {
            setCaughtList([...caughtList, critter]);
            activeCritter === 'bugs' && setBugsCaught([...bugsCaught, critter]);
            activeCritter === 'fish' && setFishCaught([...fishCaught, critter]);
            activeCritter === 'sea' && setSeaCaught([...seaCaught, critter]);
            return;
        }
    }
    const availabilityStatus = (critter, currentDateData, hemisphere) => {
        let currentMonth = Number(currentDateData.toLocaleDateString('en-US',
            {
                month: 'numeric'
            }))
        let currentTime = Number(currentDateData.toLocaleString('en-US',
            {
                hour: 'numeric',
                hour12: false
            }))
        let critterMonthAvailability = critter['availability'][`month-array-${hemisphere}`];
        let critterTimeAvailability = critter['availability']['time-array'];

        if (!critterMonthAvailability.includes(Number(currentMonth))) {
            return;
        }
        if (!critterTimeAvailability.includes(Number(currentTime))) {
            return;
        } else return "Available now";
    }

    return (
        <div className="critter-modal">
            <div className="overlay" onClick={() => { setSelectedCritter(null) }}></div>
            <div className="modal-content">
                <div className={`critter-image-container ${critterImageVisible && 'show-critter-image'}`} onClick={() => setCritterImageVisible(false)}>
                    <div className="critter-image-background">
                        <img className="critter-image" src={selectedCritter.image_uri} alt='critter'></img>
                    </div>
                </div>
                <div className="close-modal-container">
                    <button type="button" className="close-modal" onClick={() => setSelectedCritter(null)}>X</button>
                </div>
                <div className="collection-info">
                    <button className="modal-caught-status" onClick={() => setCaught(selectedCritter['file-name'])}>{modalCaughtStatus()}</button>
                    <p className="modal-availability-status">{availabilityStatus(selectedCritter, currentDateData, hemisphere)}</p>
                </div>
                <img className="critter-modal-icon" alt='critter' src={selectedCritter.icon_uri} onClick={() => setCritterImageVisible(true)}></img>
                <h1 className="critter-name">{formatCritterFileName(selectedCritter['file-name'])}</h1>
                <p className="critter-rarity">{selectedCritter['availability']['rarity']}</p>
                {selectedCritter['speed'] ? <div className="attributes-container">
                    <div className="shadow-container">
                        <img className='shadow-icon' alt='critter-shadow-size' src={shadowIconFinder(selectedCritter)}></img>
                        <p>{selectedCritter['shadow']}</p>
                    </div>
                    <div className="speed-container">
                        <img className='speed-icon' alt='critter-speed-level' src={speedIconFinder(selectedCritter)}></img>
                        <p>{selectedCritter['speed']}</p>
                    </div>
                    <div className="price-container">
                        <div className="price-normal">
                            <img className='modal-icons' alt='price' src={modalIcons.bells}></img>
                            <p>{selectedCritter['price']} Bells</p>
                        </div>
                    </div>
                </div> :
                    <div className="attributes-container">
                        <div className='location-container'>
                            <img src={locationIconFinder(selectedCritter)} alt='location' className='location-icon'></img>
                            {selectedCritter['availability']['location'] && <p>{selectedCritter['availability']['location']}</p>}
                        </div>
                        {selectedCritter['shadow'] && <div className="shadow-container">
                            <img className='shadow-icon' src={shadowIconFinder(selectedCritter)} alt='shadow-size'></img>
                            <p>{selectedCritter['shadow']}</p>
                        </div>}
                        <div className="price-container">
                            <div className="price-normal">
                                <img className='modal-icons' src={modalIcons.bells} alt='price'></img>
                                <p>{selectedCritter['price']} Bells</p>
                            </div>
                            {selectedCritter['price-cj'] &&
                                <div className="price-cj">
                                    <img className='modal-icons' src={modalIcons.cj} alt='cj'></img>
                                    <p>{selectedCritter['price-cj']} Bells</p>
                                </div>}
                            {selectedCritter['price-flick'] &&
                                <div className="price-flick">
                                    <img className='modal-icons' src={modalIcons.flick} alt='flick'></img>
                                    <p>{selectedCritter['price-flick']} Bells</p>
                                </div>}
                        </div>
                    </div>}
                <div className="seasonality-container">
                    <div className="time-of-day-container">
                        {selectedCritter['availability']['isAllDay'] ? <p>All Day</p> : <p>{selectedCritter['availability']['time']}</p>}
                    </div>
                    <div className="time-of-year-container">
                        {selectedCritter['availability']['isAllYear'] ?
                            <p className="all-year-container">All Year</p>
                            :
                            displayCritterMonthAvailability(selectedCritter)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CritterModal;