import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";
import FormField from "./form_components/formfield";
import OtpPage from "./otp";
import Checkbox from "./form_components/checkbox" ;
import Alert from "./Alert"


function Login() {

	//const navigate = useNavigate();
	const [otp, setOtp] = useState(null)
	const [hasAccount, setHasAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	var [signupSuccess, setSignup] = useState(false);
	var endpoint = "signin";
	var url =  "http://127.0.0.1:5000/api/";
	var responsePromise;

	//makes post request to backend server
	async function postData(url, endpoint, data) {
	  try {
	    const response = await fetch(url + endpoint, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify(data),
	      redirect: 'follow',
	    });

	    if (!response.ok) {
	      throw new Error('Request failed with status ' + response.status);
	    }

	    const contentType = response.headers.get('content-type');
	    if (contentType && contentType.includes('application/json')) {
      		// Handle JSON response
      		const responseData = await response.json();
      		console.log(responseData)
      		return responseData;
    	} else if (response.redirected) {
      		// Handle URL redirect
      		const redirectUrl = response.url;
      		
      		console.log(redirectUrl)
      		window.location.href = redirectUrl; // Redirect to the URL
    	} else {
      		throw new Error('Invalid response type');
    	}
	  } catch (error) {
	    console.error('Error:', error);
	    throw error;
	  }
	}

	//handles form submission
	function handleClick(event) {

		

		var requestData = {
			email: email,
			password: password
		}

		hasAccount ? endpoint = "signin" : endpoint = "signup";
		responsePromise = postData(url, endpoint, requestData);

      	responsePromise.then(response => {
  			console.log('Response:', response);
  			if (response.message === "Signup successful") {
  				setSignup(signupSuccess=true)
  				setOtp(true)
  			} else {
  				setSignup(signupSuccess=false)
  			}

		})
		.catch(error => {
  			console.error('Error:', error);
		});

      	console.log("request sent");
      	
		event.preventDefault();
	}
	if (!otp) {
		return (
			<div className="form-container">
					<form onSubmit={handleClick}>
					{signupSuccess && <Alert alert = "You've successfully created an account" />}
					<img src={logo} alt="logo"/>
			        <h3>{hasAccount ? "Welcome back" : "Create your account"}</h3>
			        {otp && <OtpPage />}
					<FormField
					value={email}
					label = "Email*"
					type = "email"
					name = "email"
					placeholder = "Email"
					onChange = {(event) => setEmail(event.target.value)}
					id = "email"
					/>
					<FormField
					value={password}
					label = "Password*"
					type = "password"
					name = "password"
					placeholder = "*******"
					onChange = {(event) => setPassword(event.target.value)}
					id = "password"
					/>
					{!hasAccount && <Checkbox
							label = "I agree to the "
							//href = {redirect}
							linkLabel = "Terms & Conditions"
							/>
					
					}
					<button type="submit">Continue</button>
					<label>{hasAccount ? "Don't have an account? " : "Already have an account? " } 
					<span onClick={() => { 
						return (
							setHasAccount(!hasAccount))}}>{hasAccount ? "Sign up" : "Sign in"}</span></label>
				</form>
			</div>
		);
	} else { return (<OtpPage />)}
}
export default Login