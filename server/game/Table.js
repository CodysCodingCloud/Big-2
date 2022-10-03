const uuid4 = require("uuid4");
const Player = "./Player";
class Table {
	constructor(socketio, tableid) {
		this.socketio = socketio;
		this.tableid = tableid;
		this.tableName = undefined;
		this.players = [];
		this.user = undefined;
		this.table;
		this.currentPlay;
		// socketio.on("joinTable", () => console.log("doubling"));
	}
}
module.exports = Table;
