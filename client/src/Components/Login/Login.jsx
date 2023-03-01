import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.styles.css';
import { Alert, CircularProgress } from '@mui/material';
import { UserContext } from '../../App';

const Login = () => {
	const [ userPassword, setuserPassword ] = useState('');
	const [ email, setemail ] = useState('');
	const { setlogin, setUserEmail, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	// Callback function handles user email
	const handleEmail = (e) => {
		setemail(e.target.value);
	};

	// Callback function handles user Password
	const handlePassword = (e) => {
		setuserPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const resp = await fetch('http://localhost:5000/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				userPassword
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await resp.json();

		if (data.status === 'ok') {
			setLoading(false);
			setAlertStatus(1);
			setMessage(data.message);

			localStorage.setItem('LoggedIn', JSON.stringify(true));
			localStorage.setItem('UserEmail', JSON.stringify(email));
			setlogin(JSON.parse(localStorage.getItem('LoggedIn')));
			setUserEmail(JSON.parse(localStorage.getItem('UserEmail')));
			setTimeout(() => {
				navigate('/tasks');
			}, 500);
		} else if (data.status === 'error') {
			setLoading(false);
			setAlertStatus(2);
			setMessage(data.message);
		}
	};

	return (
		<div className="LoginWrapper">
			{loading ? (
				<CircularProgress />
			) : alertStatus !== 0 ? (
				<Alert
					onClose={() => {
						window.location.reload();
					}}
					variant="filled"
					severity={alertStatus === 1 ? 'success' : 'error'}
				>
					{message}
				</Alert>
			) : null}

			<div className="LoginContainer">
				<div className="userInput">
					<h3>Login</h3>
					<input type="text" value={email} onChange={handleEmail} placeholder="email" />
					<input type="password" value={userPassword} onChange={handlePassword} placeholder="password" />
					<button onClick={(e) => handleSubmit(e)}>Submit</button>
				</div>
				<div className="others">
					<p>
						Need an Account?<a href="/"> Sign Up</a>
					</p>
					<p>
						Forgot Passowrd?<a href="/otp"> Get OTP</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
