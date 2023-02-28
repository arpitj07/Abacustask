import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Calendar from './Components/Calendar/Calendar';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/calendar" element={<Login />} />
				<Route path="/" element={<Calendar startingDate={new Date()} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
