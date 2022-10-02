import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
export default function Chat() {
	const chat = useSelector((state) => state.chat);
	const bottomRef = useRef(null);
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "auto" });
	}, [chat]);
	return (
		<div className="chat">
			{chat.messages.map((message, index) => (
				<Message key={index} message={message} />
			))}
			<div ref={bottomRef} id="bottomRef" />
		</div>
	);
}
