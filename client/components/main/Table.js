import React from "react";
import { useSelector } from "react-redux";
import MainArea from "./main/MainArea";
import Sidebar from "./side/Sidebar";
export default function Table() {
	return (
		<div id="play">
			<MainArea />
			<Sidebar />
		</div>
	);
}
