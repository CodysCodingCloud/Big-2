const express = require("express");
const path = require("path");
const app = express();
if (process.env.NODE_ENV !== "production") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", require("./api"));
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});
app.use("/*", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
