import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _logout } from "../store/userSlice";
let dispatch;
export default function Logout() {
	dispatch = useDispatch();
	const navigate = useNavigate();
	function logout() {
		dispatch(_logout());
		navigate("/");
	}
	return (
		<button onClick={logout} className="logout">
			Logout
		</button>
	);
}
export { dispatch };
