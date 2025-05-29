const Notify = ({errorMessage, color}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: color}}>
      {errorMessage}
    </div>
  )
}

export default Notify