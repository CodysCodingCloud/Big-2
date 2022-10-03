import { createSlice } from "@reduxjs/toolkit";
import socket from "../socketclient";
const axios = require("axios");
const authSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		_login: (state, action) => {
			socket.emit("login", action.payload);
			socket.emit("message", `${action.payload.username} logged in`);
			state = action.payload;
			return state;
		},
		_LOGOUT: (state) => {
			window.localStorage.removeItem("token");
			state = {};
			return {};
		},
	},
});
export default authSlice.reducer;
export const { _login, _LOGOUT } = authSlice.actions;
export const attemptTokenLogin = (navigate) => async (dispatch) => {
	const token = window.localStorage.getItem("token");
	if (token) {
		const { data: response } = await axios.get("/api/auth", {
			headers: {
				authorization: token,
			},
		});
		console.log("run", response);
		dispatch(_login(response));
		navigate("/play");
	}
};
export const attemptPasswordLogin =
	(loginInfo, navigate) => async (dispatch) => {
		console.log("slice", loginInfo);
		const response = await axios.post("/api/auth/login", loginInfo);
		const { token } = response.data;
		window.localStorage.setItem("token", token);
		attemptTokenLogin(navigate)(dispatch);
	};
export const _logout = () => async (dispatch) => {
	console.log("loggingout");
	dispatch(_LOGOUT());
};
