const router = require("express").Router();
const { User } = require("../db");
router.get("/", async function (req, res, next) {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (error) {
		next(error);
	}
});

router.post("/", async function (req, res, next) {
	try {
		res.send(await User.authenticate(req.headers.authorization));
	} catch (error) {
		next(error);
	}
});
router.post("/login", async function (req, res, next) {
	const { username, password } = req.body;
	console.log("attempt", { username, password });
	try {
		let token = await User.authenticate({ username, password });
		res.send({ token });
	} catch (error) {
		next(error);
	}
});
router.post("/signup", async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.send(user);
	} catch (err) {
		next(err);
	}
});
router.put("/", function (req, res, next) {
	/* etc */
});

router.delete("/", function (req, res, next) {
	/* etc */
});

module.exports = router;
