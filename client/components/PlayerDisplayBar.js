import React from "react";
import { Route, Routes } from "react-router-dom";
import { attemptTokenLogin } from "../store/userSlice";
import { useSelector } from "react-redux";
import Logout from "./Logout";

export default function PlayerDisplayBar() {
	const user = useSelector((state) => state.user);
	return (
		<div className="bar">
			<div>Big 2</div>
			{user ? (
				<div className="user-bar">
					<div>{user.username}</div>
					<div>{user.chips}</div>
					<Logout />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
