function CritterModal({
    selectedCritter,
    setSelectedCritter,
    months,
    formatString,
    caughtList,
    hemisphere,
    customMonth,
    customTime,
    locationIcons,
    modalIcons,
    shadowIcons
}) {

    const displayCritterMonthAvailability = (critter) => {
        if (critter['availability']['month-southern'] === critter['availability']['month-northern']) {
            return <div className="modal-hem-content">
                <h4 className="modal-hem-heading">Both Hemispheres</h4>
                {monthAvailability(selectedCritter, 'southern')}
            </div>
        } else return <>
            <div className="modal-hem-content">
                <h4 className="modal-hem-heading">Southern Hemisphere</h4>
                {monthAvailability(selectedCritter, 'southern')}
            </div>
            <div className="modal-hem-content">
                <h4 className="modal-hem-heading">Northern Hemisphere</h4>
                {monthAvailability(selectedCritter, 'northern')}
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

    const locationIconFinder = (critter) => {
        //BUGS
        if (critter['availability']['location'] === 'Flying'
            || critter['availability']['location'] === 'Flying (near water)') {
            return locationIcons.flying;
        }
        if (critter['availability']['location'] === 'Flying by light') {
            return locationIcons.flyingByLight;
        }
        if (critter['availability']['location'] === 'Flying near hybrid flowers') {
            return locationIcons.flyingNearHybridFlowers;
        }
        if (critter['availability']['location'] === 'On trees'
            || critter['availability']['location'] === 'Under trees') {
            return locationIcons.onTrees;
        }
        if (critter['availability']['location'] === 'On the ground') {
            return locationIcons.onTheGround;
        }
        if (critter['availability']['location'] === 'On flowers') {
            return locationIcons.onFlowers;
        }
        if (critter['availability']['location'] === 'On white flowers') {
            return locationIcons.onWhiteFlowers;
        }
        if (critter['availability']['location'] === 'Shaking trees') {
            return locationIcons.shakingTrees;
        }
        if (critter['availability']['location'] === 'Underground') {
            return locationIcons.underground;
        }
        if (critter['availability']['location'] === 'On tree stumps') {
            return locationIcons.onTreeStumps;
        }
        if (critter['availability']['location'] === 'On palm trees') {
            return locationIcons.onPalmTrees;
        }
        if (critter['availability']['location'] === 'On rotten food') {
            return locationIcons.onRottenFood;
        }
        if (critter['availability']['location'] === 'On the beach') {
            return locationIcons.onTheBeach;
        }
        if (critter['availability']['location'] === 'On beach rocks') {
            return locationIcons.onBeachRocks;
        }
        if (critter['availability']['location'] === 'Near trash') {
            return locationIcons.nearTrash;
        }
        if (critter['availability']['location'] === 'On villagers') {
            return locationIcons.onVillagers;
        }
        if (critter['availability']['location'] === 'On rocks and bush (when raining)') {
            return locationIcons.onRocksAndBush;
        }
        if (critter['availability']['location'] === 'Hitting rocks') {
            return locationIcons.hittingRocks;
        }

        //FISH
        if (critter['availability']['location'] === 'Pond') {
            return locationIcons.pond;
        }
        if (critter['availability']['location'] === 'River'
            || critter['availability']['location'] === 'River (Clifftop)'
            || critter['availability']['location'] === 'River (Mouth)') {
            return locationIcons.river;
        }
        if (critter['availability']['location'] === 'Sea'
            || critter['availability']['location'] === 'Sea (when raining or snowing)') {
            return locationIcons.sea;
        }
        if (critter['availability']['location'] === 'Pier') {
            return locationIcons.pier;
        }
        if (critter['availability']['location'] === 'River (Clifftop) & Pond'
            || critter['availability']['location'] === 'On ponds and rivers') {
            return locationIcons.pondAndRiver;
        }
        if (critter['availability']['location'] === 'Pond') {
            return locationIcons.pond;
        }
    }

    const shadowIconFinder = (fish) => {
        if (fish['shadow'] === 'Smallest (1)') {
            return shadowIcons.smallest1;
        }
        if (fish['shadow'] === 'Small (2)') {
            return shadowIcons.small2;
        }
        if (fish['shadow'] === 'Medium (3)') {
            return shadowIcons.medium3;
        }
        if (fish['shadow'] === 'Medium (4)') {
            return shadowIcons.medium4;
        }
        if (fish['shadow'] === 'Large (5)') {
            return shadowIcons.large5;
        }
        if (fish['shadow'] === 'Largest (6)') {
            return shadowIcons.largest6;
        }
        if (fish['shadow'] === 'Largest with fin (6)') {
            return shadowIcons.largestWithFin;
        }
        if (fish['shadow'] === 'Narrow') {
            return shadowIcons.narrow;
        }
    }

    const modalCaughtStatus = () => {
        if (caughtList.includes(selectedCritter['file-name'])) {
            return 'Caught'
        } else return 'Uncaught'
    }

    const availabilityStatus = (critter, customMonth, customTime, hemisphere) => {
        let critterMonthAvailability = critter['availability'][`month-array-${hemisphere}`];
        let critterTimeAvailability = critter['availability']['time-array'];

        if (!critterMonthAvailability.includes(Number(customMonth))) {
            return 'Unavailable';
        }
        if (!critterTimeAvailability.includes(Number(customTime))) {
            return 'Unavailable';
        } else return "Available now";
    }

    return (
        <div className="critter-modal">
            <div className="overlay" onClick={() => { setSelectedCritter(null) }}></div>
            <div className="modal-content">
                <button type="button" className="close-modal" onClick={() => setSelectedCritter(null)}>X</button>
                <h4 className="modal-caught-status">{modalCaughtStatus()}</h4>
                <h4 className="modal-availability-status">{availabilityStatus(selectedCritter, customMonth, customTime, hemisphere)}</h4>
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