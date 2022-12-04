import { Sequelize } from 'sequelize';

import chalk from 'chalk'

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

((await import('./models/Users.js')).default)(sequelize, Sequelize.DataTypes);
((await import('./models/Lessons.js')).default)(sequelize, Sequelize.DataTypes);
((await import('./models/Schedules.js')).default)(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	console.log(chalk.green('[!]'), 'Database synced!');

	sequelize.close();
}).catch(console.error);