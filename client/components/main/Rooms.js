import React from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../socketclient";
export default function Rooms() {
	const dispatch = useDispatch();
	const rooms = useSelector((state) => state.game.rooms);
	const [newRoomName, setRoomName] = React.useState("");

	React.useEffect(() => {
		socket.emit("getTables");
	}, []);
	function handleOnClick() {
		console.log("click?");
		socket.emit("getTables");
	}
	function handleNameChange(e) {
		setRoomName(e.target.value);
	}
	function handleJoinRoom(e) {
		console.log(e.target.value);
		socket.emit("joinTable", e.target.value);
	}
	handleJoinRoom;
	function newRoom(event) {
		console.log("click?");

		socket.on("createTableError", (err) => {
			console.log(err);
			event.target.className = "buttonError";
			setTimeout(() => {
				event.target.className = "";
			}, 1000);
		});
		socket.emit("createTable", newRoomName);
	}
	function handleOnClick3() {
		console.log("click?");
		socket.emit("getTables");
	}
	function handleOnClick4() {
		console.log("click?");
		socket.emit("getTables");
	}
	return (
		<div id="rooms">
			<h2>Playable Rooms</h2>
			<div className="roomRow">
				<h3>room name</h3>
				<p>number of players</p>
				<button onClick={handleOnClick}>Refresh Tables</button>
			</div>
			{rooms.map((room) => (
				<div className="roomRow" key={room.name}>
					<h3>{room.name}</h3>
					<p>{room.players.length}/4</p>
					<button
						className="joinRoom"
						value={room.name}
						onClick={(e) => handleJoinRoom(e)}
					>
						join Table
					</button>
				</div>
			))}
			<br></br>

			<input
				type="text"
				onChange={(e) => handleNameChange(e)}
				value={newRoomName}
			></input>
			<button onClick={(e) => newRoom(e)}>Create New Room</button>
			<button onClick={handleOnClick3}>Tables</button>
			<button onClick={handleOnClick4}>Tables</button>
		</div>
	);
}
