import { createSlice } from "@reduxjs/toolkit";
import socket from "../socketclient";
const axios = require("axios");
const gameSlice = createSlice({
	name: "game",
	initialState: { rooms: [], currentgame: {}, tableName: "" },
	reducers: {
		getRooms: (state, action) => {
			state.rooms = action.payload;
			return state;
		},
		joinTable: (state, action) => {
			state.tableName = action.payload.tableName;
			state.tableid = action.payload.tableid;
			return state;
		},
		leaveTable: (state) => {
			state = { rooms: [], currentgame: {}, tableName: "" };
			return state;
		},
		_logout: (state) => {
			state = { rooms: [], currentgame: {}, tableName: "" };
			return state;
		},
		newGame: (state, action) => {
			// state.tableName = action.payload;
			return state;
		},
		playHand: (state, action) => {
			// state.tableName = action.payload;
			return state;
		},
	},
});
export default gameSlice.reducer;
export const { getRooms, _logout, joinTable, newGame, playHand, leaveTable } =
	gameSlice.actions;
// export const _socketMessage = (messageObj) => async (dispatch) => {
// 	console.log("slice", messageObj);
// 	messageObj.socketMsg.time = new Date();
// 	dispatch(_addMessage(messageObj));
// };
// export const _sendMessage = (room, socketMsg) => async (dispatch) => {
// 	socket.emit("convomsg", { room, socketMsg });

// 	dispatch(_addMessage({ room, socketMsg }));
// 	console.log(socketMsg);
// };
