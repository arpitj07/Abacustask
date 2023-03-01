import React, { useEffect, useContext, useState } from 'react';

import './CalendarEventModal.styles.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { DAYS, MONTHS } from '../Calendar/utils/utils';

const CalendarEventModal = ({ setOpen, userDetails, currentDate }) => {
	const { login, userEmail } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!login) {
			navigate('/login');
		}
	}, []);

	return (
		<div className="CalendarTaskWrapper">
			<div className="CalendarTaskContainer">
				<div className="closebutton">
					<button onClick={() => setOpen(false)}>X</button>
				</div>
				<div className="TaskBody">
					<div className="addEvent">
						<h4>Events</h4>
						<p>
							Date: {currentDate.date}-{MONTHS[currentDate.month]}-{currentDate.year}
						</p>
						{userDetails.map((task) =>
							task.map((item, index) => {
								const date = new Date(item.Date).getDate();
								const month = new Date(item.Date).getMonth();
								const year = new Date(item.Date).getFullYear();
								const day = new Date(item.Date).getDay();
								const starthours = new Date(item.StartTime).toTimeString().slice(0, 5);
								const endhours = new Date(item.EndTime).toTimeString().slice(0, 5);

								if (
									`${date}-${MONTHS[month]}-${year}` ===
									`${currentDate.date}-${MONTHS[currentDate.month]}-${currentDate.year}`
								) {
									return (
										<div className="EventAndButtons" key={index}>
											<span>
												<li>{item.Event}</li>
												<p>
													{DAYS[day]} {date}-{MONTHS[month]}-{year} {starthours}-{endhours}
												</p>
											</span>
										</div>
									);
								}
							})
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarEventModal;
