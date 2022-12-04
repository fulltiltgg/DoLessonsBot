import env from './env.js'
import Context from './../models/Context.js'

import { Bot } from 'grammy'
import { run } from '@grammyjs/runner'

const bot = new Bot(env.TOKEN, {
	ContextConstructor: Context,
});

export default bot;