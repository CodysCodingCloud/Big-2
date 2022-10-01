import { createSlice } from "@reduxjs/toolkit";
import socket from "../socketclient";
const axios = require("axios");
const authSlice = createSlice({
	name: "chat",
	initialState: { room: null, chat: [] },
	reducers: {
		_login: (state, action) => {
			console.log("running");
			socket.emit("message", `${action.payload.username} logged in`);
			socket.emit("joinRooms", action.payload.conversations);
			state = action.payload;
			return state;
		},
		_logout: (state, action) => {
			socket.emit("message", `${action.payload.username} logged out`);
			state = {};
			return {};
		},
		_addMessage: (state, action) => {
			state.chat.push(action.payload);
			return state;
		},
		_clearMessages: (state) => {
			state.room = null;
			state.chat = [];
			return state;
		},
	},
});
export default authSlice.reducer;
export const { _login, _LOGOUT } = authSlice.actions;
export const attemptTokenLogin = () => async (dispatch) => {};
export const attemptPasswordLogin = (loginInfo) => async (dispatch) => {};
