import React from "react";
export default function Message({ message }) {
	return (
		<div className="message">
			<p className="userName">{message.username} :</p>
			<p className="message-content"> {message.message}</p>
			<p className="datetime">{message.time}</p>
		</div>
	);
}
