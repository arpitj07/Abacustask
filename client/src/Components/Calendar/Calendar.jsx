import React, { useContext, useEffect, useState } from 'react';
import './Calendar.styles.css';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { DateRange, getDateObj, getDaysInMonth, getSortedMonth, isDateSame, MONTHS } from './utils/utils';
// import EventModal from './Modal/EventModal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Calendar = ({ startingDate }) => {
	const [ currentMonth, setcurrentMonth ] = useState(startingDate.getMonth());
	const [ currentYear, setcurrentYear ] = useState(startingDate.getFullYear());
	const daysInMonth = getDaysInMonth(currentMonth, currentYear);
	// const [ open, setOpen ] = React.useState(false);

	const { login } = useContext(UserContext);
	const navigate = useNavigate();

	const [ userDetails, setuserDetails ] = useState({
		date: '',
		month: '',
		year: ''
	});

	useEffect(() => {
		if (!login) {
			navigate('/login');
		}
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
		// setOpen(true);
		setuserDetails({
			...userDetails,
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
							{date}
						</span>
					))}
				</div>
				{/* {open && <EventModal setOpen={setOpen} userDetails={userDetails} />} */}
			</div>
		</div>
	);
};

export default Calendar;
