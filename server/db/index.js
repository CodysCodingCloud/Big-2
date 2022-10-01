const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./User");
const syncAndSeed = async () => {
	try {
		await db.sync({ force: true });
		await User.create({
			username: "test",
			email: "test@gmail.com",
			password: "password",
			wins: 91,
			gamesPlayed: 100,
			chips: 1000,
		});
		await User.create({
			username: "test2",
			email: "test2@gmail.com",
			password: "password",
			wins: 10,
			gamesPlayed: 200,
			chips: 300,
		});
		await User.create({
			username: "test3",
			email: "test3@gmail.com",
			password: "password",
			wins: 91,
			gamesPlayed: 150,
			chips: 48,
		});
		await User.create({
			username: "test4",
			email: "test4@gmail.com",
			password: "password",
			wins: 10,
			gamesPlayed: 49,
			chips: 90,
		});
		await Promise.all(
			require("./seed/user").map((user) => {
				return User.create(user);
			})
		);
		console.log(`Seeding successful!`);
	} catch (error) {
		console.log(error);
	}
};
module.exports = { db, User, syncAndSeed };
