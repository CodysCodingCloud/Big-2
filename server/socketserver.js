module.exports = function (io) {
	io.on("connection", (socket) => {
		console.log("a user connected");
		socket.join("lobby");
		socket.on("message", (message) => {
			console.log(message);
		});
		socket.on("convomsg", (messageObj) => {
			socket.emit("message", "msg sent");
			socket.broadcast.to(messageObj.room).emit("convomsg", messageObj);
		});
		socket.on("joinGame", (room) => {
			socket.join(room);
		});
	});
	// io.broadcast
	io.on("disconnect", () => console.log("bye", socket.id));
};
