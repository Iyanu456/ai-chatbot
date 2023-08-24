import React, { useState } from 'react';
import ToogleIcon from './ToogleIcon';
import eyeVisible from "../assets/icons/eye.svg";
import eyeSlash from '../assets/icons/eye-slash.svg';
import './styles/floatinglabel.css';

function FloatingPassword(props) {

  const [passwordVisible, setVisibility] = useState(false)

  return (
    <div className="form-group">

      <input
        value={props.value}
        type={passwordVisible ? 'text' : 'password'} 
        name={props.name}
        className="form-control" 
        id="FloatingPassword"
        placeholder=" "
        onChange={props.onChange}
      />

      <label htmlFor="floatingInput">{props.label}</label>
      <ToogleIcon
        beforeClick={eyeVisible}
        afterClick={eyeSlash}
        onClick={() => {setVisibility(!passwordVisible)}} 
      />
    </div>
    )
}

export default FloatingPassword