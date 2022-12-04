import { Composer } from "grammy";

import { keyboard as welcomeKeyboard } from './../keyboards/welcome.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.use(welcomeKeyboard);

feature.command('start', async ctx => {
	await ctx.reply('[👋] Добро пожаловать в Do Lessons, что вы хотите указать?', {
		reply_markup: welcomeKeyboard
	})
});