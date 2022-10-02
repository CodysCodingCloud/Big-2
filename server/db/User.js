const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT = process.env.JWT || "test";
const SALT = process.env.SALT || 9;
const User = db.define("user", {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: { notEmpty: true },
		unique: {
			arg: true,
			msg: "This usename is already registered please try a different name",
		},
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false,
		unique: {
			arg: true,
			msg: "This e-mail has already been registered please try a different email address",
		},
		validate: {
			notEmpty: false,
			isEmail: {
				args: true,
				msg: "this is not a valid email",
			},
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: { notEmpty: true },
	},
	wins: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	gamesPlayed: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	chips: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
	},
});
module.exports = User;
User.authenticate = async function ({ username, password }) {
	console.log("att", { username, password });
	const user = await User.findOne({
		where: { username: { [Op.iLike]: username } },
	});
	if (user) {
		let match = await bcrypt.compare(password, user.password);
		if (match) {
			const token = await jwt.sign({ userId: user.id }, JWT);
			return token;
		}
	}
	const error = Error("bad credentials");
	error.status = 401;
	throw error;
};
User.findByToken = async function (token) {
	try {
		const decodedToken = jwt.verify(token, JWT);
		const user = await User.findByPk(decodedToken.userId);
		if (user) return user;
	} catch (err) {
		const error = Error("bad credentials");
		error.status = 401;
		throw error;
	}
};
const hashPassword = async (user) => {
	const password = await bcrypt.hash(user.password, SALT);
	return password;
};
User.beforeCreate(async (user) => {
	user.password = await hashPassword(user);
	return user;
});

module.exports = User;
