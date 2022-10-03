import React from "react";
import { Route, Routes } from "react-router-dom";
import { attemptTokenLogin } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import PlayerDisplayBar from "./components/PlayerDisplayBar";
import Play from "./components/Play";
import RerouteHome from "./components/RerouteHome";
import Signup from "./components/Signup";
export default function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	React.useEffect(() => {
		try {
			dispatch(attemptTokenLogin(navigate));
		} catch (error) {
			console.log("no token");
		}
	}, []);
	return (
		<div id="app">
			<header className="header">
				<PlayerDisplayBar />
			</header>
			<main>
				<Routes>
					<Route index element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/play" element={<Play />} />
					<Route path="*" element={<RerouteHome />} />
				</Routes>
			</main>
		</div>
	);
}
