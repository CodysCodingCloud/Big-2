const uuid4 = require("uuid4");
const Player = "./Player";
class Table {
	constructor(socketio, tableid) {
		this.socketio = socketio;
		this.tableid = tableid;
		this.tableName = undefined;
		this.players = [];
		this.user = undefined;
		this.table = [];
		this.currentPlayer;
		// socketio.on("joinTable", () => console.log("doubling"));
	}
	startgame() {
		//shuffle and pass cards
		this.socketio.in(tableid).emit("", {});
	}
	checkhand() {
		this.play();
	}
	nextplayerr() {
		this.socketio.in(tableid).emit("", {});
	}
	pass() {
		this.socketio.in(tableid).emit("", {});
		nextplayer();
	}
	play() {
		this.socketio.in(tableid).emit("", {});
		nextplayer();
	}
}
module.exports = Table;
