import { useState } from "react";
import locationIconFinder from "./utils/locationIconFinder";
import shadowIconFinder from "./utils/shadowIconFinder";
import speedIconFinder from "./utils/speedIconFinder";
import ProgressiveImage from "./ProgressiveImage";
import loadingIconSrc from '../icons/circle-notch-solid.png';
import './stylesheets/CritterModal.css'

import { capitaliseFirstLetter, formatCritterFileName } from "./utils/stringFormats";

function CritterModal({
    activeCritter,
    iconUrl,
    imageUrl,
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
                        <ProgressiveImage
                            src={`${imageUrl}${selectedCritter['file-name']}.png`}
                            loadingIconSrc={loadingIconSrc}
                            imgClass="critter-image"
                            alt='critter'
                        />
                    </div>
                </div>
                <div className="top-modal-buttons-container">
                    <a href={`https://animalcrossing.fandom.com/wiki/${selectedCritter['file-name']}`} target='_blank'><button type="button" target='_blank' className="view-wiki">View Wiki</button></a>
                    <button type="button" className="close-modal" onClick={() => setSelectedCritter(null)}>X</button>
                </div>
                <div className="collection-info">
                    <button className="modal-caught-status" onClick={() => setCaught(selectedCritter['file-name'])}>{modalCaughtStatus()}</button>
                    <p className="modal-availability-status">{availabilityStatus(selectedCritter, currentDateData, hemisphere)}</p>
                </div>
                <ProgressiveImage
                    src={`${iconUrl}${selectedCritter['file-name']}.png`}
                    loadingIconSrc={loadingIconSrc}
                    imgClass="critter-modal-icon"
                    alt='critter'
                    onClick={() => setCritterImageVisible(true)}
                />
                <h1 className="critter-name">{formatCritterFileName(selectedCritter['file-name'])}</h1>
                <p className="critter-rarity">{selectedCritter['availability']['rarity']}</p>
                {selectedCritter['speed'] ? <div className="attributes-container">
                    <div className="shadow-container">
                        <ProgressiveImage
                            src={shadowIconFinder(selectedCritter)}
                            loadingIconSrc={loadingIconSrc}
                            imgClass="shadow-icon"
                            alt='critter-shadow-size'
                        />
                        <p>{selectedCritter['shadow']}</p>
                    </div>
                    <div className="speed-container">
                        <ProgressiveImage
                            src={speedIconFinder(selectedCritter)}
                            loadingIconSrc={loadingIconSrc}
                            imgClass="speed-icon"
                            alt='critter-speed-level'
                        />
                        <p>{selectedCritter['speed']}</p>
                    </div>
                    <div className="price-container">
                        <div className="price-normal">
                            <ProgressiveImage
                                src={modalIcons.bells}
                                loadingIconSrc={loadingIconSrc}
                                imgClass="modal-icons"
                                alt='price'
                            />
                            <p>{selectedCritter['price']} Bells</p>
                        </div>
                    </div>
                </div> :
                    <div className="attributes-container">
                        <div className='location-container'>
                            <ProgressiveImage
                                src={locationIconFinder(selectedCritter)}
                                loadingIconSrc={loadingIconSrc}
                                imgClass="location-icon"
                                alt='location'
                            />
                            {selectedCritter['availability']['location'] && <p>{selectedCritter['availability']['location']}</p>}
                        </div>
                        {selectedCritter['shadow'] && <div className="shadow-container">
                            <ProgressiveImage
                                src={shadowIconFinder(selectedCritter)}
                                loadingIconSrc={loadingIconSrc}
                                imgClass="shadow-icon"
                                alt='shadow-size'
                            />
                            <p>{selectedCritter['shadow']}</p>
                        </div>}
                        <div className="price-container">
                            <div className="price-normal">
                                <ProgressiveImage
                                    src={modalIcons.bells}
                                    loadingIconSrc={loadingIconSrc}
                                    imgClass="modal-icons"
                                    alt='price'
                                />
                                <p>{selectedCritter['price']} Bells</p>
                            </div>
                            {selectedCritter['price-cj'] &&
                                <div className="price-cj">
                                    <ProgressiveImage
                                        src={modalIcons.cj}
                                        loadingIconSrc={loadingIconSrc}
                                        imgClass="modal-icons"
                                        alt='cj'
                                    />
                                    <p>{selectedCritter['price-cj']} Bells</p>
                                </div>}
                            {selectedCritter['price-flick'] &&
                                <div className="price-flick">
                                    <ProgressiveImage
                                        src={modalIcons.flick}
                                        loadingIconSrc={loadingIconSrc}
                                        imgClass="modal-icons"
                                        alt='flick'
                                    />
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