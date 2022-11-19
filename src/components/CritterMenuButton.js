function CritterMenuButton({
  activeCritter,
  setActiveCritter,
  critter,
  critterIcon,
  ...props
}) {
  return (
    <div className={`critter-button ${activeCritter === critter && 'critter-active'}`}
      onClick={() => setActiveCritter(critter)}>
      <img
        className='critter-button-icon'
        src={critterIcon} 
        alt={props.alt}
      >
      </img>
    </div>
  )
}

export default CritterMenuButton;