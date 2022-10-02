const express = require("express");
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;
const db = require("./db");
async function init() {
	try {
		await db.db.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
	const httpServer = http.createServer(app);
	const io = new Server(httpServer, {});
	require("./socketserver")(io);
	httpServer.listen(port, () => {
		console.log(`app is listenting on http://localhost:${port}\n`);
	});
}
init();
