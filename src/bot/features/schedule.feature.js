import { Composer } from 'grammy';

import { createConversation } from '@grammyjs/conversations';

import { keyboard as backKeyboard } from './../keyboards/back.keyboard.js';
import { keyboard as daysKeyboard } from './../keyboards/days.keyboard.js';

import { Users } from './../../database.js'

export const composer = new Composer();

async function schedule(conversation, ctx) {
	await ctx.reply(
		`[⚒] Укажите расписание для <b>${ctx.match[0].toLowerCase()}</b>.`,
		{ reply_markup: backKeyboard }
	);
	
	const { msg } = await conversation.waitFor('message:text');

	if (msg.text === '↪️ Назад') {
		await ctx.reply(
			`[❌] Отмена указывания расписание для <b>${ctx.match[0].toLowerCase()}</b>.`,
			{ reply_markup: daysKeyboard }
		);
		return;
	}

	await conversation.external(async () => {
		(await Users.findUser(ctx.from.id)).setSchedule(ctx.match[0].toLowerCase(), msg.text.replace(/\n/gi, ';').toLowerCase());
	});

	await ctx.reply(
		`[🎓] Вы указали расписание для <b>${ctx.match[0].toLowerCase()}</b>:\n<code>${msg.text}</code>`,
		{ reply_markup: daysKeyboard }
	);
	return;
};

const feature = composer.chatType('private');

feature.use(createConversation(schedule));

feature.hears(/Понедельник|Вторник|Среда|Четверг|Пятница/i, async ctx => {
	await ctx.conversation.enter('schedule');
});