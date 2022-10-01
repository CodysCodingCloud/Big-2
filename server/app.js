const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(function (req, res, next) {
	const err = new Error("Not found.");
	err.status = 404;
	next(err);
});
app.use("*", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
