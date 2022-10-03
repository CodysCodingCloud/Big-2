import React from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import TextArea from "./TextArea";
export default function Sidebar() {
	const room = useSelector((state) => state.chat.room);
	return (
		<div id="sideBar">
			<h3>Chat</h3>
			<p>Room:{room.roomname}</p>
			<Chat />
			<TextArea />
		</div>
	);
}
