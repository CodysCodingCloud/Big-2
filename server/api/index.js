const router = require("express").Router();

router.use("/auth", require("./auth.js"));
// router.use("/messages", require("./messages"));

module.exports = router;
