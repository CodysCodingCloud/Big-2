import { createSlice } from "@reduxjs/toolkit";
import socket from "../socketclient";
const axios = require("axios");
const chatSlice = createSlice({
	name: "chat",
	initialState: { room: { roomname: "lobby", roomid: "lobby" }, messages: [] },
	reducers: {
		_login: (state, action) => {
			console.log("running");
			socket.emit("message", `${action.payload.username} logged in`);
			return state;
		},
		_logout: (state, action) => {
			socket.emit("message", `${action.payload.username} logged out`);
			state = {};
			return {};
		},
		joinroom: (state, action) => {
			(state.room.roomname = action.payload.tableName),
				(state.room.roomid = action.payload.tableid);
			return state;
		},
		leaveroom: (state) => {
			state.room = { roomname: "lobby", roomid: "lobby" };
			return state;
		},
		_addMessage: (state, action) => {
			console.log(action.payload.socketMsg.time);
			action.payload.socketMsg.time =
				action.payload.socketMsg.time.toLocaleTimeString();
			console.log(action.payload.socketMsg.time);
			state.messages.push(action.payload.socketMsg);
			return state;
		},
		_clearMessages: (state) => {
			state.room = { roomname: "lobby", roomid: "lobby" };
			state.chat = [];
			return state;
		},
	},
});
export default chatSlice.reducer;
export const {
	_login,
	_LOGOUT,
	_addMessage,
	_clearMessages,
	joinroom,
	leaveroom,
	joinTable,
} = chatSlice.actions;
export const _socketMessage = (messageObj) => async (dispatch) => {
	messageObj.socketMsg.time = new Date();
	dispatch(_addMessage(messageObj));
};
export const _sendMessage = (room, socketMsg) => async (dispatch) => {
	socket.emit("convomsg", { room, socketMsg });

	dispatch(_addMessage({ room, socketMsg }));
	console.log(socketMsg);
};
