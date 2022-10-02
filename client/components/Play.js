import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainArea from "./main/MainArea";
import Sidebar from "./side/Sidebar";
export default function Play() {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	React.useEffect(() => {
		if (!user.id) {
			navigate("/");
		}
	}, []);
	return (
		<div id="play">
			<MainArea />
			<Sidebar />
		</div>
	);
}
