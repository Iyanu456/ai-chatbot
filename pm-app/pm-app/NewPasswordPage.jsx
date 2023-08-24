import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FloatingPassword from "./form_components/FloatingPassword";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function NewPasswordPage() {
	
	const [newPassword, setPassword] = useState("");
	const [reEnterPassword, setReEnterPassword] = useState("");
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

	var endpoint = "signin";
	var responsePromise;
	var url =  "http://127.0.0.1:5000/api/";

	useEffect(() => {
		// Once you have the redirect URL and state, perform the redirection
		if (redirectURL) {
			navigate(redirectURL);
    	}
  	}, [navigate, redirectURL]);

	function handleClick(event) {

		var formData = {
			newPassword: newPassword,
			reEnterPassword: reEnterPassword
		}

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
	        	<h4 className="heading  mb-20">New password</h4>
	        	
				<FloatingPassword
					value={newPassword}
					label="New password"
					name="password"
					onChange={(event) => {setPassword(event.target.value)}}
				/>
				<FloatingPassword
					value={reEnterPassword}
					label="Confirm new password"
					name="password"
					onChange={(event) => {setReEnterPassword(event.target.value)}}
				/>
				<button className="mt-5 submit" type="submit">Reset password</button>
			</form>
	    </div>
	)
};

export default NewPasswordPage