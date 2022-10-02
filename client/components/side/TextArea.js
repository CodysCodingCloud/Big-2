import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { _sendMessage } from "../../store/chatSlice";

export default function TextArea() {
	const [message, setMessage] = React.useState("");
	// const [error, setError] = React.useState({});
	const dispatch = useDispatch();
	let username = useSelector((state) => state.user.username);
	let room = useSelector((state) => state.chat.room);

	function handleChange(e) {
		setMessage(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (message.length > 0) {
			let time = new Date();
			dispatch(_sendMessage(room, { message, username, time }));
			setMessage("");
		}
	}
	function onEnter(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("sendmsg").click();
		}
	}
	return (
		<form className="message-textarea" onSubmit={(e) => handleSubmit(e)}>
			<textarea
				value={message}
				onChange={(e) => handleChange(e)}
				placeholder={"message"}
				onKeyDown={(e) => onEnter(e)}
			></textarea>
			<button type="submit" id="sendmsg">
				↑
			</button>
		</form>
	);
}
