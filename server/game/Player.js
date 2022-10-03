const uuid4 = require("uuid4");
const Table = require("./Table.js");
class Player {
	constructor(socketio, gamesocket) {
		this.socketio = socketio;
		this.gamesocket = gamesocket;
		this.table = undefined;
		this.tableid = undefined;
		this.seat = undefined;
		this.user = undefined;
		this.hand = [];
		gamesocket.on("login", (user) => this.login(user));
		gamesocket.on("disconnect", this.disconnectFromTable);
		gamesocket.on("leaveTable", this.disconnectFromTable);

		gamesocket.on("createTable", (newTable) => this.createTable(newTable));
		gamesocket.on("joinTable", (tableName) => this.joinTable(tableName));

		gamesocket.on("playHand", this.playHand);
		gamesocket.on("pass", this.pass);
		gamesocket.on("win", this.win);
		gamesocket.on("lose", this.lose);
		gamesocket.on("getTables", () => {
			// console.log("testing class");
			// console.log(gamesocket.id);
			let room = Object.keys(socketio.gameroom).map((roomname) => {
				return {
					name: roomname,
					id: socketio.gameroom[roomname].tableid,
					players: socketio.gameroom[roomname].players,
				};
			});
			gamesocket.emit("getTables", room);
		});
	}
	login = (user) => {
		this.user = user;
	};
	disconnectFromTable = () => {
		if (this.table) {
			console.log("hhhh", this.table);
			let messageObj = {
				socketMsg: {
					time: new Date(),
					message: `${this.user.username} have left ${this.table}`,
					username: "system",
				},
			};
			this.gamesocket.broadcast.to(this.tableid).emit("convomsg", messageObj);

			console.log("672", this.tableid);
			this.gamesocket.leave(this.tableid);
			this.tableid = "lobby";
			this.gamesocket.join(this.tableid);
			this.gamesocket.emit("leaveTable", this.table);
			this.table = undefined;
		}
	};
	createTable = (roomName) => {
		if (!this.socketio.gameroom[roomName]) {
			this.table = uuid4();
			this.socketio.gameroom[roomName] = new Table(this.socketio, this.table);
			// this.gamesocket.join(roomName);
			this.socketio.in("lobby").emit("createTable");
		} else {
			this.gamesocket.emit(
				"createTableError",
				"room already exist try a diferent name"
			);
		}
	};
	joinTable = (tableName) => {
		// console.log(this.socketio.gameroom[tableName].players);
		console.log(tableName);
		if (this.socketio.gameroom[tableName].players.length < 4) {
			// console.log(this);
			// this.socketio.gameroom[tableName].players.push(this);
			// console.log(Object.keys(this.socketio.gameroom[tableName].players[0].user));
			this.table = tableName;
			this.tableid = this.socketio.gameroom[tableName].tableid;
			this.gamesocket.join(this.tableid);
			let messageObj = {
				socketMsg: {
					time: new Date(),
					message: `${this.user.username} has joined ${this.table}`,
					username: "system",
				},
			};
			this.gamesocket.broadcast.to(this.tableid).emit("convomsg", messageObj);
			this.gamesocket.emit("joinTable", tableName, this.tableid);
			this.gamesocket.leave("lobby");
			// this.socketio.gameroom[tableName].players
		} else {
			const error = Error("room is at max capacity");
			this.gamesocket.emit("joinTableError", error);
		}
	};

	playHand = () => {};
	pass = () => {};
	win = () => {};
	lose = () => {};
}
module.exports = Player;
