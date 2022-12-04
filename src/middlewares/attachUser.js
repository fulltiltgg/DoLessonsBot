import { Users } from './../helpers/db.js'

import chalk from 'chalk'

async function attachUser(ctx, next) {
	const [user, created] = await Users.findOrCreate({ 
		where: { userId: ctx.from.id },
		defaults: {
			userId: ctx.from.id,
		},
	});

	if (!user) {
		console.error(chalk.red('[X]'), 'User not found!');
	}

	ctx.dbuser = user;

	await next();
}

export default attachUser;