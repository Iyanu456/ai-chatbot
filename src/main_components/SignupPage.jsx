import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FloatingLabel from "./form_components/FloatingLabel";
import FloatingPassword from "./form_components/FloatingPassword";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function SignupPage() {


	let [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

	var endpoint = "signup";
	var responsePromise;
	var url =  "https://iyanu.pythonanywhere.com/api/";

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

		responsePromise = postData(url, endpoint, formData);

		responsePromise.then(response => {

  			console.log('Response:', response)
  			if (response.message === "signup successful" ) {
				setRedirectURL(response.redirectURL);
  			} else if (response.redirectURL !== null) {
				setRedirectURL(response.redirectURL);
			}
		}).catch(error => {
  			console.error('Error:', error);
		});

		event.preventDefault();
	}

	return (
		<div className="form-container">
			<form className="loginform" onSubmit={handleClick}>
				<img className="logo" src={logo} alt="logo"/>
	        	<h1 className="heading">Create your account</h1>
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
				<button className="mt-5 mb-5 submit" type="submit">Continue</button>
				<small className="t-center">Already have an account? 
				<span onClick={() =>  navigate('/login')}> Log in</span></small>
			</form>
	    </div>
	)
};

export default SignupPage
