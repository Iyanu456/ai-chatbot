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
  var url =  "http://127.0.0.1:5000/api/"
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
      <form onSubmit={handleClick}> 
        <img className="logo" src={logo} alt="logo"/>
        <h4 className="heading">Enter code</h4>
        <p className="t-center">Please enter the code we just sent you</p>
        
        <FormField
          name ="otp"
          placeholder ="000 000"
          className="t-center"
          onChange={(event) => {setOtp(event.target.value)}}
        />
        <div className="btn-group g-10">
          <button className="submit wd-100" type="submit">Continue</button>
        </div>
      </form>
  </div>
  )
    
}

export default OtpPage