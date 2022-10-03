import React from "react";
import { useSelector } from "react-redux";
import socket from "../../socketclient";
export default function Table() {
	const game = useSelector((state) => state.game);
	function handleClick() {
		socket.emit("leaveTable");
	}
	return (
		<div id="table">
			<div className="playbar">
				<p>
					Table Name: <span id="tableName">{game.tableName}</span>
				</p>
				<button id="leavetable" onClick={handleClick}>
					leave Table
				</button>
			</div>
			<div className="playArea">
				<div id="topPlayer"></div>
				<div id="leftPlayer"></div>
				<div id="leftPlayer"></div>
				<div id="leftPlayer"></div>
				<div id="pool"></div>
				<div id="deck"></div>
			</div>
		</div>
	);
}
