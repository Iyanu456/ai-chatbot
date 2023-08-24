
function Icon(props) {


  return (
      <img 
        src={props.icon}
        onClick={props.onClick}
        alt="Icon"
      />
    )
    
}

export default Icon