import "./styles/floatinglabel.css"
import React from "react"

function FloatingLabel(props) {

  return (
    <div className="form-group">
    <input
      value={props.value}
      type={props.type} 
      name={props.name}
      className="form-control" 
      id="floating"
      placeholder=" "
      onChange={props.onChange}
    />
    <label htmlFor="floatingInput">{props.label}</label>
    </div>
    )
    
}

export default FloatingLabel