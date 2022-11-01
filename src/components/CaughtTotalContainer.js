function CaughtTotalContainer({
    critterIcons,
    bugsCaught,
    fishCaught,
    seaCaught
}) {
    return (
        <div className="caught-total-container">
            <h1 className="caught-total-heading">Caught</h1>
            <div className='caught-total-content'>
              <div className='critter-total'>
                <><img src={critterIcons.bug} alt='bug-icon' className='critter-total-icon'></img> {`${bugsCaught.length} : 80`}</>
              </div>
              <div className='critter-total'>
                <><img src={critterIcons.fish} alt='fish-icon' className='critter-total-icon'></img>{`${fishCaught.length} : 80`}</>
              </div>
              <div className='critter-total'>
                <><img src={critterIcons.sea} alt='sea-creature-icon' className='critter-total-icon'></img>{`${seaCaught.length} : 40`}</>
              </div>
            </div>
          </div>
    )
}

export default CaughtTotalContainer;