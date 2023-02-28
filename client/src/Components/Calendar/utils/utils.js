export const DAYS = [ 'SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT' ];

export const MONTHS = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];

// This function returns an array of dates based on the number provided
export const DateRange = (end) => {
	const { date } = Array.from({ length: end }).reduce(
		({ date, current }) => ({
			date: [ ...date, current ],
			current: current + 1
		}),
		{ date: [], current: 1 }
	);
	return date;
};

// This function returns total number of days in the month
export const getDaysInMonth = (month, year) => {
	return new Date(year, month + 1, 0).getDate();
};

export const getSortedMonth = (month, year) => {
	const dayIndex = new Date(year, month, 1).getDay();
	return [ ...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex) ];
};

// This returns a date object
export const getDateObj = (day, month, year) => {
	return new Date(year, month, day);
};

// This functions checks if two given dates are same or not
export const isDateSame = (first, second) => {
	return (
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate()
	);
};
