import React, { useState } from "react";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";
import FormField from "./form_components/formfield";
import OtpPage from "./otp";
import Checkbox from "./form_components/checkbox" ;
import Alert from "./Alert"
import postData from "./postdata"


function Login() {

	const [otp, setOtp] = useState(null)
	const [hasAccount, setHasAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	var [signupSuccess, setSignup] = useState(false);

	var endpoint = "signin";
	var responsePromise;
	var url =  "http://127.0.0.1:5000/api/";

	//handles form submission
	const handleClick = (event) => {

		var formData = {
			email: email,
			password: password
		}

		hasAccount ? endpoint = "signin" : endpoint = "signup";
		responsePromise = postData(url, endpoint, formData);
		console.log("request sent");

		responsePromise.then(response => {

  			console.log('Response:', response);
  			if (response.message === "Signup successful") {
  				setSignup(signupSuccess=true)
  				setOtp(true)
  			}
		}).catch(error => {
  			console.error('Error:', error);
		});

  		event.preventDefault()
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
};
export default Login