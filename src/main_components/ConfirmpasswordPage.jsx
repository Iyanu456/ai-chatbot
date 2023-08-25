import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FloatingPassword from "./form_components/FloatingPassword";
import postData from "./postdata";
import logo from "./assets/icons/logo.svg";
import "./styles/form.css";


function ConfirmpasswordPage() {

    const [passwordMatch, setPasswordMatch] = useState(null)
	const [password, setPassword] = useState("");
    const location = useLocation();
    const [confirm_password, setConfirmPassword] = useState("")
	const [redirectURL, setRedirectURL] = useState(null);
	const navigate = useNavigate();

    let email = location.state

	var endpoint = "signup";
	var responsePromise;
	var url =  "https://iyanu.pythonanywhere.com/api/";

	useEffect(() => {
		// Once you have the redirect URL and state, perform the redirection
		if (redirectURL && email !== "") {
			navigate(redirectURL, { state: email });
    	}
  	}, [navigate, redirectURL, email]);
      useEffect(() => {
		if (password === "" || confirm_password === "") { setPasswordMatch(null) }
		if (password !== "" && confirm_password !== "") {
            if (password === confirm_password) {setPasswordMatch(true)}
         } else {setPasswordMatch(false)}
  	}, [password, confirm_password, setPasswordMatch]);

  //
	function handleClick(event) {

        if (!passwordMatch) {
            return
        }

        

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
	        	<h1 className="heading">Create your password</h1>
				<FloatingPassword
					value={password}
					label="Password"
					name="password"
					onChange={(event) => {
                        setPassword(event.target.value)
                        //check_password()
                    }}
				/>
				<FloatingPassword
					value={confirm_password}
					label="Password confirm"
					name="confirm_password"
					onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        //check_password()
                    }}
				/>
                {passwordMatch === false ? <small>Passwords don't match</small> : null}
				<button className="mt-5 mb-5 submit" type="submit">Continue</button>
				<small className="t-center">Already have an account? 
				<span onClick={() =>  navigate('/login')}> Log in</span></small>
			</form>
	    </div>
	)
};

export default ConfirmpasswordPage
