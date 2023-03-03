import React, { useEffect, useContext, useState } from 'react';
import { DAYS, MONTHS } from '../Calendar/utils/utils';
import { Alert, CircularProgress } from '@mui/material';
import './EventList.styles.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EventList = () => {
	const [ userDetails, setuserDetails ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const fetchUserDetails = async () => {
		setloading(true);
		const resp = await fetch(`${process.env.REACT_APP_API}/userDetails/${userEmail}`);
		const data = await resp.json();

		if (userDetails.length === 0) userDetails.push(data);
		setloading(false);
	};

	useEffect(() => {
		if (!login) {
			navigate('/login');
		}

		fetchUserDetails();
	}, []);

	const handleDelete = async (id) => {
		const resp = await fetch('http://localhost:5000/deleteEvent', {
			method: 'POST',
			body: JSON.stringify({
				id,
				userEmail
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await resp.json();
		console.log(data);
		if (data.status === 'ok') {
			setAlertStatus(1);
			setMessage(data.message);

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	const handleComplete = async (id) => {
		const resp = await fetch('http://localhost:5000/completeEvent', {
			method: 'POST',
			body: JSON.stringify({
				userEmail
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await resp.json();
		console.log(data);
		if (data.status === 'ok') {
			setAlertStatus(1);
			setMessage(data.message);

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	return (
		<div className="ListWrapper">
			<div className="ListContainer">
				<div className="EventListContainer">
					<h4>Event List</h4>

					{!loading ? (
						userDetails.map((task) =>
							task.map((item, index) => {
								const date = new Date(item.Date).getDate();
								const month = new Date(item.Date).getMonth();
								const year = new Date(item.Date).getFullYear();
								const day = new Date(item.Date).getDay();
								const starthours = new Date(item.StartTime).toTimeString().slice(0, 5);
								const endhours = new Date(item.EndTime).toTimeString().slice(0, 5);

								return (
									<div className="EventAndButtons" key={index}>
										<span>
											<span>
												<li
													style={{
														color: `${item.Status === 'Complete' ? 'green' : 'red'} `
													}}
												>
													{item.Event}
												</li>
												<CheckCircleIcon
													sx={{
														display: `${item.Status === 'Complete' ? 'block' : 'none'} `,
														color: 'green'
													}}
												/>
											</span>
											<p>
												{DAYS[day]} {date}-{MONTHS[month]}-{year} {starthours}-{endhours}
											</p>
										</span>
										<div className="buttons">
											<button
												className="editbutton"
												style={{ width: '50px', backgroundColor: '#495057' }}
											>
												edit
											</button>
											<button
												className="completebutton"
												onClick={handleComplete}
												style={{ width: '80px', backgroundColor: '#ffba08' }}
											>
												{item.Status === 'Complete' ? 'Incomplete' : 'Complete'}
											</button>
											<button
												className="delete"
												onClick={() => handleDelete(item.TId)}
												style={{ width: '50px', backgroundColor: '#d00000' }}
											>
												delete
											</button>
										</div>
									</div>
								);
							})
						)
					) : (
						<CircularProgress />
					)}
				</div>
			</div>
		</div>
	);
};

export default EventList;
