import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.styles.css';
import { Alert, CircularProgress } from '@mui/material';

const Register = () => {
	const [ userName, setuserName ] = useState('');
	const [ userEmail, setuserEmail ] = useState('');
	const [ userPassword, setuserPassword ] = useState('');

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const navigate = useNavigate();

	// Callback function handles user name
	const handleName = (e) => {
		setuserName(e.target.value);
	};

	// Callback function handles user email
	const handleEmail = (e) => {
		setuserEmail(e.target.value);
	};

	// Callback function handles user Password
	const handlePassword = (e) => {
		setuserPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const resp = await fetch('http://localhost:5000/register', {
			method: 'POST',
			body: JSON.stringify({
				userName,
				userEmail,
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
			setTimeout(() => {
				navigate('/login');
			}, 1500);
		} else if (data.status === 'error') {
			setLoading(false);
			setAlertStatus(2);
			setMessage(data.message);
		}
	};

	return (
		<div className="RegisterWrapper">
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

			<div className="RegisterContainer">
				<div className="userInput">
					<h3>Create an account</h3>
					<input type="text" value={userName} onChange={handleName} placeholder="name" />
					<input type="text" value={userEmail} onChange={handleEmail} placeholder="email" />
					<input type="password" value={userPassword} onChange={handlePassword} placeholder="password" />
					<button onClick={(e) => handleSubmit(e)}>Sign Up</button>
				</div>
				<div className="others">
					<span>
						Already Have an Account?<a href="/login"> Log in</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Register;
