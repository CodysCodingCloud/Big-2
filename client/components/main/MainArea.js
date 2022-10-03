import React from "react";
import { useSelector } from "react-redux";
import Rooms from "./Rooms";
import Table from "./Table";
export default function MainArea() {
	const roomName = useSelector((state) => state.game.tableName);
	return (
		<div id="mainArea">
			<p>play Big two on browser</p>
			{roomName ? <Table /> : <Rooms />}
		</div>
	);
}
