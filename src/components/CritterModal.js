function CritterModal({
    selectedCritter,
    setSelectedCritter,
    months,
    formatString
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
                return  <>
                <p>{`${months[rangeArray[0] - 1]} - ${months[rangeArray[1] - 1]} &`}</p>
                <p>{`${months[rangeArray[2] - 1]}`}</p>
            </>
            } else return <>
                <p>{`${months[rangeArray[0] - 1]} - ${months[rangeArray[1] - 1]} &`}</p>
                <p>{`${months[rangeArray[2] - 1]} - ${months[rangeArray[3] - 1]}`}</p>
            </>
        } else return <p>{`${months[monthArray[0] - 1]} - ${months[monthArray[monthArray.length - 1] - 1]}`}</p>
    }

    return (
        <div className="critter-modal">
            <div className="overlay" onClick={() => { setSelectedCritter(null) }}></div>
            <div className="modal-content">
            <button type="button" className="close-modal" onClick={() => setSelectedCritter(null)}>X</button>
                <h1 className="critter-name">{formatString(selectedCritter['file-name'])}</h1>
                <p>{selectedCritter['availability']['rarity']}</p>
                <img className="critter-image" src={selectedCritter.image_uri}></img>
                {selectedCritter['speed'] ? null : 
                <div className="attributes-container">
                    <p>{selectedCritter['availability']['location']}</p>
                    <p>{selectedCritter['shadow']}</p>
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