import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FormField from "./form_components/FormField";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";

function OtpPage() {

  const [otp, setOtp] = useState(null)
  const location = useLocation();
  const [redirectURL, setRedirectURL] = useState(null);
  const email = location.state;
  var endpoint = "auth";
  var url =  "https://iyanu.pythonanywhere.com/api/"
  var responsePromise;

  const navigate = useNavigate();
    useEffect(() => {
        // Once you have the redirect URL and state, perform the redirection
        if (redirectURL && email !== "") {
            navigate(redirectURL, { state: email });
        }
      }, [navigate, redirectURL, email]);

  function handleClick(event){

    var formData = {
      otp: otp,
      email: email
    }
    
    responsePromise = postData(url, endpoint, formData)
    console.log("request sent");

    responsePromise.then(response => {
        console.log('Response:', response);
        if (response.message === "Auth successful") {
            setRedirectURL(response.redirectURL);
          
        }
    }).catch(error => {
        console.error('Error:', error);
    });

    event.preventDefault()



  }

  return (
    <div className="form-container">
      <form className="loginform"onSubmit={handleClick}> 
        <img className="logo" src={logo} alt="logo"/>
        <h1 className="heading">Enter code</h1>
        <small className="t-center mb-10 mt-5">Please enter the code we just sent you</small>
        
        <FormField
          name ="otp"
          placeholder ="000000"
          className="otp"
          onChange={(event) => {setOtp(event.target.value)}}
        />
        <div className="btn-group g-10">
          <button className="submit mt-10 wd-100" type="submit">Continue</button>
        </div>
      </form>
  </div>
  )
    
}

export default OtpPage