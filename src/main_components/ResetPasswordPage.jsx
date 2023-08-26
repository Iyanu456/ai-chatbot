import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FloatingLabel from "./form_components/FloatingLabel";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function ResetPasswordPage() {

	let [email, setEmail] = useState("");
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

	var endpoint = "forgot-password";
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
		}

		responsePromise = postData(url, endpoint, formData);

		responsePromise.then(response => {

  			console.log('Response:', response);
  			if (response.message === "response submitted" ) {
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
	        	<h1 className="heading">Reset your password</h1>
				<small className="mb-15 t-center">Enter your email address and we will send you instructions to reset your password.</small>
				<FloatingLabel
					value={email}
					label="Email address"
					type="email"
					name="email"
					onChange={(event) => {setEmail(event.target.value)}}
				/>
				<button className="mt-10 mb-10 submit" type="submit">Continue</button>
				<small 
				onClick={() =>  navigate('/login')}
				className="t-center pointer">Back to
				<span> login</span></small>
			</form>
	    </div>
	)
};

export default ResetPasswordPage
