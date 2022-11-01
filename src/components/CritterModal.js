import { useState } from "react";
import locationIconFinder from "./utils/locationIconFinder";
import shadowIconFinder from "./utils/shadowIconFinder";

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
    formatString,
    hemisphere,
    customMonth,
    customTime,
    modalIcons,
}) {
    const [modalHemisphere, setModalHemisphere] = useState(hemisphere);
    const setModalHemisphereButton = () => {
        if (modalHemisphere === 'southern') {
            return setModalHemisphere('northern');
        }
        if (modalHemisphere === 'northern') {
            return setModalHemisphere('southern');
        }
    }

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const displayCritterMonthAvailability = (critter) => {
        if (critter['availability']['month-southern'] === critter['availability']['month-northern']) {
            return <div className="modal-hem-content">
                <h4 className="modal-hem-heading">Both Hemispheres</h4>
                {monthAvailability(selectedCritter, 'southern')}
            </div>
        } else return <>
            <div className="modal-hem-content">
                <button className="modal-hem-button" onClick={() => setModalHemisphereButton()}>{`${capitaliseFirstLetter(modalHemisphere)} Hemisphere`}</button>
                {monthAvailability(selectedCritter, modalHemisphere)}
            </div>
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

    const availabilityStatus = (critter, customMonth, customTime, hemisphere) => {
        let critterMonthAvailability = critter['availability'][`month-array-${hemisphere}`];
        let critterTimeAvailability = critter['availability']['time-array'];

        if (!critterMonthAvailability.includes(Number(customMonth))) {
            return;
        }
        if (!critterTimeAvailability.includes(Number(customTime))) {
            return;
        } else return "Available now";
    }

    return (
        <div className="critter-modal">
            <div className="overlay" onClick={() => { setSelectedCritter(null) }}></div>
            <div className="modal-content">
                <button type="button" className="close-modal" onClick={() => setSelectedCritter(null)}>X</button>
                <div className="collection-info">
                    <button className="modal-caught-status" onClick={() => setCaught(selectedCritter['file-name'])}>{modalCaughtStatus()}</button>
                    <p className="modal-availability-status">{availabilityStatus(selectedCritter, customMonth, customTime, hemisphere)}</p>
                </div>
                <h1 className="critter-name">{formatString(selectedCritter['file-name'])}</h1>
                <p>{selectedCritter['availability']['rarity']}</p>
                <img className="critter-image" src={selectedCritter.image_uri}></img>
                {selectedCritter['speed'] ? <div className="attributes-container">
                    <div className="price-container">
                        <div className="price-normal">
                            <img className='modal-icons' src={modalIcons.bells}></img>
                            <p>{selectedCritter['price']} Bells</p>
                        </div>
                    </div>
                </div> :
                    <div className="attributes-container">
                        <div className='location-container'>
                            <img src={locationIconFinder(selectedCritter)} className='location-icon'></img>
                            {selectedCritter['availability']['location'] && <p>{selectedCritter['availability']['location']}</p>}
                        </div>
                        {selectedCritter['shadow'] && <div className="shadow-container">
                            <img className='shadow-icon' src={shadowIconFinder(selectedCritter)}></img>
                            <p>{selectedCritter['shadow']}</p>
                        </div>}
                        <div className="price-container">
                            <div className="price-normal">
                                <img className='modal-icons' src={modalIcons.bells}></img>
                                <p>{selectedCritter['price']} Bells</p>
                            </div>
                            {selectedCritter['price-cj'] &&
                                <div className="price-cj">
                                    <img className='modal-icons' src={modalIcons.cj}></img>
                                    <p>{selectedCritter['price-cj']} Bells</p>
                                </div>}
                            {selectedCritter['price-flick'] &&
                                <div className="price-flick">
                                    <img className='modal-icons' src={modalIcons.flick}></img>
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