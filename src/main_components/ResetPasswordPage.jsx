import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FloatingLabel from "./form_components/FloatingLabel";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function ResetPasswordPage() {
	
	const [email, setEmail] = useState("");
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

	var endpoint = "signin";
	var responsePromise;
	var url =  "http://127.0.0.1:5000/api/";

    useEffect(() => {
        // Once you have the redirect URL and state, perform the redirection
        if (redirectURL && email !== "") {
            navigate(redirectURL, { state: email });
        }
      }, [navigate, redirectURL, email]);

	function handleClick(event) {

		var formData = {
			email: email
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
	        	<h4 className="heading">Reset your password</h4>
	        	<p className="t-center">Enter the email associated with your account and we'll send an email with instructions to reset your password.</p>
				<FloatingLabel
					value={email}
					label="Email address"
					type="email"
					name="email"
					onChange={(event) => {setEmail(event.target.value)}}
				/>
				<button className="mt-5 submit" type="submit">Submit</button>
			</form>
	    </div>
	)
};

export default ResetPasswordPage