import './App.css';
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Calendar from './Components/Calendar/Calendar';
import Register from './Components/Register/Register';
import { NavBarComp } from './Components/Navbar/Navbar';
import EventModal from './Components/Tasks/EventModal';
import EventList from './Components/EventList/EventList';

export const UserContext = createContext(null);
let LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
let USEREMAIL = JSON.parse(localStorage.getItem('UserEmail'));

function App() {
	const [ login, setlogin ] = useState(LoggedIn);
	const [ userEmail, setUserEmail ] = useState(USEREMAIL);

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{
					login,
					setlogin,
					userEmail,
					setUserEmail
				}}
			>
				<NavBarComp />
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/tasks" element={<EventModal />} />
					<Route path="/eventlist" element={<EventList />} />
					<Route path="/calendar" element={<Calendar startingDate={new Date()} />} />
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
