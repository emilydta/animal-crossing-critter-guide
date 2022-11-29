import './stylesheets/Card.css'

function InfoCard({
    infoCardActive,
    setInfoCardActive
}) {

    return (
        <>
            <div className="card-container">
                <div className='card-overlay' onClick={() => setInfoCardActive(false)}></div>
                <div className='info-card-content-wrapper'>
                    <div className='info-card-content'>
                        <div className="close-card-container">
                            <button type="button" className="close-card" onClick={() => setInfoCardActive(false)}>X</button>
                        </div>
                        <h1 className="card-heading">Hello! 🌱</h1>
                        <p className="card-main-description-line">Thanks for checking out my ACNH Critter Guide!</p>
                        <p className="card-main-description">
                            I initially built this site to display which critters are available at the current moment, but I thought why stop there!
                            Now it's a fully fledged tool that will hopefully meet all of your critter-catching needs! I also drew (with help from in-game sprites) icons for critter locations, shadow sizes, and speed levels to make it as visual as possible!
                        </p>
                        <p className="card-main-description">
                            I hope you find it useful!
                        </p>

                        <div className="card-links">The data for this site is sourced from:
                            <a href='https://acnhapi.com/' target='_blank'><span> ACNH API</span></a>
                            <p className="card-description ko-fi">If you feel like buying me a coffee, you can do so <a href='https://ko-fi.com/emilydta' target='_blank'>here</a></p>
                        </div>
                        <p className="card-disclaimer">Animal Crossing is the property of Nintendo and I do not claim to own any of the data pertaining to the franchise. This is an entirely free, fan-made project. </p>
                        <p className="card-happy-hunting">Happy hunting! 🎣 🐞</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoCard;