import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./MainPage";
import SignupPage from "./SignupPage"
//import ConfirmpasswordPage from "./ConfirmpasswordPage"
import LoginPage from "./LoginPage"
import OtpPage from "./OtpPage";
import ResetPasswordPage from "./ResetPasswordPage";
import NewPasswordPage from "./NewPasswordPage";
import "./styles/utilities.css";
import "./styles/variables.css";

function App() {

	return (
		<div>
			<Router>
				<Routes>
	      			<Route 
	      				path="/" 
	      				element={<SignupPage />} 
	      			/>
					<Route 
	      				path="/login" 
	      				element={<LoginPage />} 
	      			/>
	      			<Route 
	      				path="/mainpage" 
	      				element={<MainPage />} 
	      			/>
	      			<Route 
	      				path="/otp" 
	      				element={<OtpPage />} 
	      			/>
	      			<Route 
	      				path="/forgot-password" 
	      				element={<ResetPasswordPage />} 
	      			/>
	      			<Route 
	      				path="/password-reset" 
	      				element={<NewPasswordPage />} 
	      			/>
	      		</Routes>	
	      	</Router>
      	</div>
	)
}

export default App