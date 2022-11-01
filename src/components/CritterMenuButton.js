function CritterMenuButton({
    activeCritter,
    setActiveCritter,
    critter,
    critterIcon
}) {
return (
    <div className={`critter-button ${activeCritter === critter && 'critter-active'}`}
              onClick={() => setActiveCritter(critter)}>
              <img
                className='critter-button-icon'
                src={critterIcon}
              >
              </img>
            </div>
)
}

export default CritterMenuButton;