import { Sequelize, Op } from 'sequelize';

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

Reflect.defineProperty(Users, 'findUser', {
	value: async function (userId) {
		const [user, created] = await Users.findOrCreate({ 
			where: { userId: userId },
			defaults: {
				userId: userId,
			},
		});

		if (!user) {
			console.error(chalk.red('[X]'), 'User not found!');
		}

		return user;
	},
});

Reflect.defineProperty(Users.prototype, 'setLesson', {
	value: async function (lessonId, value) {
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

Reflect.defineProperty(Users.prototype, 'setSchedule', {
	value: async function (dayId, value) {
		const [schedule, created] = await Schedules.findOrCreate({ 
			where: { userId: this.userId, dayId: dayId },
			defaults: {
				userId: this.userId,
				dayId: dayId,
				value: null,
			},
		});

		schedule.value = value;
		schedule.save();

		return;
	},
});

function normalizeDate(day) {
	const days = [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ];

	const tomorrowDay = day !== 0 && day !== 6 ? days[day+1] : days[1];

	return tomorrowDay;
}

Reflect.defineProperty(Users.prototype, 'getLessons', {
	value: async function () {
		const dayId = normalizeDate(new Date().getDay());

		const [schedule, created] = await Schedules.findOrCreate({ 
			where: { userId: this.userId, dayId: dayId },
			defaults: {
				userId: this.userId,
				dayId: dayId,
				value: null,
			},
		});

		const scheduleNormalized = schedule.value.split(';').map(el => ({ lessonId: el }));

		const lessons = await Lessons.findAll({
			where: { userId: this.userId, [Op.or]: scheduleNormalized },
		});

		return lessons;
	},
});

Reflect.defineProperty(Users.prototype, 'getSchedules', {
	value: async function () {
		const schedules = await Schedules.findAll({
			where: { userId: this.userId },
		});

		return schedules;
	},
});

export { Users, Lessons, Schedules };