import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./MainPage";
import LoginPage from "./LoginPage"
import OtpPage from "./OtpPage";
import ResetPasswordPage from "./ResetPasswordPage";
import NewPasswordPage from "./NewPasswordPage";
import "./styles/utilities.css";

function App() {

	return (
		<div>
			<Router>
				<Routes>
	      			<Route 
	      				path="/" 
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
	      				path="/new-password" 
	      				element={<NewPasswordPage />} 
	      			/>
	      		</Routes>	
	      	</Router>
      	</div>
	)
}

export default App