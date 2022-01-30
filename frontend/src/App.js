import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Profile from './pages/profile';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} exact></Route>
				<Route path="/profile" element={<Profile />} exact></Route>
			</Routes>
		</div>
	);
}

export default App;
