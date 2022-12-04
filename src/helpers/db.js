import { Sequelize } from 'sequelize';

import chalk from 'chalk'

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

console.log(chalk.green('[!]'), 'Database connected!');

const Users = ((await import('./../models/Users.js')).default)(sequelize, Sequelize.DataTypes);
const Lessons = ((await import('./../models/Lessons.js')).default)(sequelize, Sequelize.DataTypes);
const Schedules = ((await import('./../models/Schedules.js')).default)(sequelize, Sequelize.DataTypes);

Reflect.defineProperty(Users.prototype, 'setLesson', {
	value: async (lessonId, value) => {
		const [lesson, created] = await Lessons.findOrCreate({ 
			where: { userId: this.userId, lessonId: lessonId },
			defaults: {
				userId: this.userId,
				lessonId: lessonId,
				value: null,
			},
		});

		lesson.value = value;
		lesson.save();

		return;
	},
});

export { Users, Lessons, Schedules };