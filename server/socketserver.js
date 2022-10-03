const Player = require("./game/Player.js");
const Table = require("./game/Table.js");
const uuid4 = require("uuid4");
const players = [];
module.exports = function (io) {
	io.gameroom = {
		playnow: new Table(io, uuid4()),
		bored: new Table(io, uuid4()),
	};
	io.on("connection", (socket) => {
		players.push(new Player(io, socket));
		console.log("a user connected");
		socket.join("lobby");
		socket.on("message", (message) => {
			console.log(message);
		});
		socket.on("convomsg", (messageObj) => {
			socket.emit("message", "msg sent");
			//emit(listener,arg for callback,ar2,arg3)
			socket.broadcast.to(messageObj.room).emit("convomsg", messageObj);
		});
		socket.on("getTables", () => {
			// console.log(players);
			console.log(socket.id);
			// 	socket.emit("getTables", gameroom);
		});

		// socket.on("joinGame", (room) => {
		// 	socket.join(room);
		// });
	});
	// io.broadcast
	io.on("disconnect", () => console.log("bye", socket.id));
};
