import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FloatingLabel from "./form_components/FloatingLabel";
import FloatingPassword from "./form_components/FloatingPassword";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function LoginPage() {

	const [hasAccount, setHasAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

	var endpoint = "signin";
	var responsePromise;
	var url =  "http://iyanu.pythonanywhere.com/";

	useEffect(() => {
		// Once you have the redirect URL and state, perform the redirection
		if (redirectURL && email !== "") {
			navigate(redirectURL, { state: email });
    	}
  	}, [navigate, redirectURL, email]);

	function handleClick(event) {

		var formData = {
			email: email,
			password: password
		}

		hasAccount ? endpoint = "signin" : endpoint = "signup";
		responsePromise = postData(url, endpoint, formData);

		responsePromise.then(response => {

  			console.log('Response:', response);
  			if (response.message === "Signup successful") {
				setRedirectURL(response.redirectURL);
  			}
		}).catch(error => {
  			console.error('Error:', error);
		});

		event.preventDefault();
	}

	return (
		<div className="form-container">
			<form onSubmit={handleClick}>
				<img className="logo" src={logo} alt="logo"/>
	        	<h4 className="heading mb-15">{hasAccount ? "Welcome back" : "Create your account"}</h4>
				<FloatingLabel
					value={email}
					label="Email address"
					type="email"
					name="email"
					onChange={(event) => {setEmail(event.target.value)}}
				/>
				<FloatingPassword
					value={password}
					label="Password"
					name="password"
					onChange={(event) => {setPassword(event.target.value)}}
				/>
				<button className="mt-5 submit" type="submit">Continue</button>
				<small className="t-center">{hasAccount ? "Don't have an account? " : "Already have an account? " } 
				<span onClick={() => { 
					return (
						setHasAccount(!hasAccount))}}>{hasAccount ? "Sign up" : "Log in"}
				</span>
				</small>
			</form>
	    </div>
	)
};

export default LoginPage