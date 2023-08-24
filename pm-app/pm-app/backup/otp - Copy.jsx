import React, { useState } from "react";
import FormField from "./form_components/formfield"
import "./styles/form.css"
import postData from "./postdata"
import arrowLeft from "./assets/icons/arrow-left-2.svg";

function OtpPage({ logo, email}) {

  const [otp, setOtp] = useState(null)
  var endpoint = "auth";
  var url =  "http://127.0.0.1:5000/api/"
  var responsePromise;

  function handleOtp(event) {
    setOtp(event.target.value)
  }

  function handleClick(event){

    var formData = {
      otp: otp,
      email: email
    }
    
    responsePromise = postData(url, endpoint, formData)
    console.log("request sent");

    responsePromise.then(response => {
        console.log('Response:', response);
    }).catch(error => {
        console.error('Error:', error);
    });

    event.preventDefault()



  }

  return (
    <div className="form-container">
      <form onSubmit={handleClick}> 
        <img className="logo" src={logo} alt="logo"/>
        <h4 className="t-center bd-2">Enter code</h4>
        <p className="t-center">Please enter the code we just sent you</p>
        <FormField
        //type = "email"
        name = "otp"
        placeholder = "0000"
        id = "email"
        className="t-center"
        onChange={handleOtp}
        />
        <div className="btn-group g-10">
          <img src={arrowLeft} className="submit icon" alt="back"></img>
          <button className="submit wd-100" type="submit">Continue</button>
        </div>
      </form>
  </div>
  )
    
}

export default OtpPage