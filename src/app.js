import bot from './helpers/bot.js'
import { run } from '@grammyjs/runner'
import { session } from 'grammy'
import { conversations } from '@grammyjs/conversations'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'

import {} from './helpers/db.js'

import { composer as menuFeature } from './features/menu.feature.js'
import { composer as lessonsFeature } from './features/lessons.feature.js'
import { composer as scheduleFeature } from './features/schedule.feature.js'
import { composer as gettersFeature } from './features/getters.feature.js'
import { composer as settersFeature } from './features/setters.feature.js'

import path from 'path'
import fs from 'fs'

import chalk from 'chalk'
/**
 * red - error
 * green - success
 * yellow - wait
 * blue - admin
 * magenta - debug
 */

async function main() {
	console.log(chalk.yellow('[*]'), 'Starting app...');

	// middlewares
	bot.use(session({
		initial() {
			return {};
		},
	}));
	bot.use(conversations());
	
	// markdown
	bot.use(hydrateReply);	
	bot.api.config.use(parseMode('HTML'));

	// handlers
	bot.use(menuFeature);
	bot.use(scheduleFeature);
	bot.use(lessonsFeature);
	bot.use(gettersFeature);
	bot.use(settersFeature);

	// errors
	bot.catch(err => {
		console.error(chalk.red('[X]'), err.error);
	});

	// Start bot
	await bot.init();
	run(bot, undefined, undefined, { silent: true });

	console.log(chalk.green('[!]'), `Bot @${bot.botInfo.username} is up and running!`);
}

main();