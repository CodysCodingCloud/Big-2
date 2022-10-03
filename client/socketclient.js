const { io } = require("socket.io-client");
import { store } from "./index";
import { dispatch } from "./components/Logout";
import { getRooms } from "./store/gameSlice";
// const store = require("./store");
// console.log(store);
import {
	_socketMessage,
	_addMessage,
	joinroom,
	leaveroom,
} from "./store/chatSlice";
import { joinTable, leaveTable } from "./store/gameSlice";
const socket = io();

socket.on("connect", () => {
	console.log("hi", socket.id);
});

socket.on("convomsg", (messageObj) => {
	console.log("client got", messageObj);
	store.dispatch(_socketMessage(messageObj));
	// dispatch(_socketMessage(messageObj));
});
socket.on("getTables", (tables) => {
	store.dispatch(getRooms(tables));
});
socket.on("createTable", () => {
	socket.emit("getTables");
});
socket.on("joinTable", (tableName, tableid) => {
	console.log(tableName, tableid);
	store.dispatch(joinTable({ tableName, tableid }));
	store.dispatch(joinroom({ tableName, tableid }));
	let messageObj = {
		socketMsg: {
			time: new Date(),
			message: `you have joined ${tableName}`,
			username: "system",
		},
	};
	store.dispatch(_addMessage(messageObj));
});
socket.on("message", (msg) => console.log("received message", msg));
socket.on("leaveTable", (tableName) => {
	store.dispatch(leaveTable());
	store.dispatch(leaveroom());
	let messageObj = {
		socketMsg: {
			time: new Date(),
			message: `you have left ${tableName}`,
			username: "system",
		},
	};
	store.dispatch(_addMessage(messageObj));
});
export default socket;
