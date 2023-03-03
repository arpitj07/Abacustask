import React, { useContext, useEffect, useState } from 'react';
import './Calendar.styles.css';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DateRange, getDateObj, getDaysInMonth, getSortedMonth, isDateSame, MONTHS } from './utils/utils';
import CalendarEventModal from '../Calendar/CalendarEventModal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Calendar = ({ startingDate }) => {
	const [ currentMonth, setcurrentMonth ] = useState(startingDate.getMonth());
	const [ currentYear, setcurrentYear ] = useState(startingDate.getFullYear());
	const daysInMonth = getDaysInMonth(currentMonth, currentYear);
	const [ open, setOpen ] = React.useState(false);

	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	const [ loading, setLoading ] = useState(false);

	const [ userDetails, setuserDetails ] = useState([]);
	const [ currentDate, setcurrentDate ] = useState({
		date: '',
		month: '',
		year: ''
	});

	const fetchUserDetails = async () => {
		setLoading(true);
		const resp = await fetch(`${process.env.REACT_APP_API}/${userEmail}`);
		const data = await resp.json();

		if (userDetails.length === 0) userDetails.push(data);
		console.log(userDetails[0][0]['Date']);
		setLoading(false);
	};

	useEffect(() => {
		if (!login) {
			navigate('/login');
		}
		fetchUserDetails();
	}, []);

	const handleBackButton = () => {
		if (currentMonth > 0) {
			setcurrentMonth((curr) => curr - 1);
		} else {
			setcurrentMonth(11);
			setcurrentYear((curr) => curr - 1);
		}
	};

	const handleForwardButton = () => {
		if (currentMonth < 11) {
			setcurrentMonth((curr) => curr + 1);
		} else {
			setcurrentMonth(0);
			setcurrentYear((curr) => curr + 1);
		}
	};

	const handleAddEventModal = (date, month, year) => {
		setOpen(true);
		setcurrentDate({
			...currentDate,
			date: date,
			month: month,
			year: year
		});
	};
	return (
		<div className="CalendarWrapper">
			<div className="CalendarContainer">
				<div className="Calendarhead">
					<ArrowCircleLeftOutlinedIcon
						onClick={handleBackButton}
						sx={{ fontSize: '40px', cursor: 'pointer' }}
					/>
					<p>
						{MONTHS[currentMonth]} {currentYear}
					</p>
					<ArrowCircleRightOutlinedIcon
						onClick={handleForwardButton}
						sx={{ fontSize: '40px', cursor: 'pointer' }}
					/>
				</div>
				<div className="CalendarDays">
					{getSortedMonth(currentMonth, currentYear).map((day, i) => <span key={i}>{day}</span>)}
				</div>
				<div className="CalendarBody" style={{ gridTemplateRows: `${daysInMonth === 28 ? 4 : 5}` }}>
					{DateRange(daysInMonth).map((date, i) => (
						<span
							key={i}
							onClick={() => handleAddEventModal(date, currentMonth, currentYear)}
							style={{
								backgroundColor: `${isDateSame(new Date(), getDateObj(date, currentMonth, currentYear))
									? '#bde0fe'
									: 'white'}`
							}}
						>
							<p>{date}</p>
							{userDetails.map((task) =>
								task.map((item, index) => {
									const saveddate = new Date(item.Date).getDate();
									const month = new Date(item.Date).getMonth();
									const year = new Date(item.Date).getFullYear();
									const day = new Date(item.Date).getDay();
									const starthours = new Date(item.StartTime).toTimeString().slice(0, 5);
									const endhours = new Date(item.EndTime).toTimeString().slice(0, 5);
									if (`${saveddate}-${month}-${year}` === `${date}-${currentMonth}-${currentYear}`) {
										return <h5>{item.Event}</h5>;
									}
								})
							)}
						</span>
					))}
				</div>
				{open && <CalendarEventModal setOpen={setOpen} currentDate={currentDate} userDetails={userDetails} />}
			</div>
		</div>
	);
};

export default Calendar;
