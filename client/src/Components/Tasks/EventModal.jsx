import React, { useEffect, useContext, useState } from 'react';
// import { MONTHS } from '../Calendar/utils/utils';
import './EventModal.styles.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { Alert, CircularProgress } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DAYS, MONTHS } from '../Calendar/utils/utils';

const EventModal = () => {
	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();
	const [ date, setDate ] = React.useState(new Date());
	const [ startTime, setstartTime ] = useState(new Date());
	const [ endTime, setendTime ] = useState(new Date());

	const [ eventText, setevent ] = useState('');

	const [ alertStatus, setAlertStatus ] = useState(0);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		if (!login) {
			navigate('/login');
		}
	}, []);

	const handleDateChange = (newValue) => {
		setDate(newValue);
	};

	const handleStartTimeChange = (newValue) => {
		setstartTime(newValue);
	};

	const handleEndTimeChange = (newValue) => {
		setendTime(newValue);
	};

	const handleAddEvent = async (e) => {
		e.preventDefault();
		setLoading(true);
		const resp = await fetch(`${process.env.REACT_APP_API}/addEvent`, {
			method: 'POST',
			body: JSON.stringify({
				eventText,
				userEmail,
				startTime,
				endTime,
				date
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
				window.location.reload();
			}, 1000);
		} else if (data.status === 'error') {
			setLoading(false);
			setAlertStatus(2);
			setMessage(data.message);
		}
	};

	return (
		<div className="TaskWrapper">
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
			<div className="TaskContainer">
				<div className="TaskBody">
					<div className="addEvent">
						<h4>Add Event</h4>
						<div className="dateTimePicker">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<DesktopDatePicker
										label="Date desktop"
										inputFormat="MM/DD/YYYY"
										value={date}
										onChange={handleDateChange}
										renderInput={(params) => <TextField {...params} />}
									/>

									<TimePicker
										label="Time"
										value={startTime}
										onChange={handleStartTimeChange}
										renderInput={(params) => <TextField {...params} />}
									/>
									<TimePicker
										label="Time"
										value={endTime}
										onChange={handleEndTimeChange}
										renderInput={(params) => <TextField {...params} />}
									/>
								</Stack>
							</LocalizationProvider>
						</div>
						<p>{/* Date: {userDetails.date}-{MONTHS[userDetails.month]}-{userDetails.year} */}</p>
						<textarea
							type="text"
							placeholder="your event"
							onChange={(e) => setevent(e.target.value)}
							value={eventText}
						/>
						<button className="addEventBtn" onClick={(e) => handleAddEvent(e)}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventModal;
