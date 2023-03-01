import React, { useEffect, useContext, useState } from 'react';
import { DAYS, MONTHS } from '../Calendar/utils/utils';
import { Alert, CircularProgress } from '@mui/material';
import './EventList.styles.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const EventList = () => {
	const [ userDetails, setuserDetails ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const fetchUserDetails = async () => {
		setloading(true);
		const resp = await fetch(`http://localhost:5000/userDetails/${userEmail}`);
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

	return (
		<div className="ListWrapper">
			<div className="ListContainer">
				<div className="EventListContainer">
					<h4>Event List</h4>
					<div className="EventAndButtons">
						{!loading ? (
							userDetails.map((task, index) => {
								const date = new Date(task[0].Date).getDate();
								const month = new Date(task[0].Date).getMonth();
								const year = new Date(task[0].Date).getFullYear();
								const day = new Date(task[0].Date).getDay();
								const starthours = new Date(task[0].StartTime).toTimeString().slice(0, 5);
								const endhours = new Date(task[0].EndTime).toTimeString().slice(0, 5);
								return (
									<React.Fragment key={index}>
										<span>
											<li>{task[0].Event}</li>
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
												style={{ width: '80px', backgroundColor: '#ffba08' }}
											>
												complete
											</button>
											<button
												className="delete"
												style={{ width: '50px', backgroundColor: '#d00000' }}
											>
												delete
											</button>
										</div>
									</React.Fragment>
								);
							})
						) : (
							<CircularProgress />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventList;
