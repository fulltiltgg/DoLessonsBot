import { Composer  } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

import { keyboard as setLessonsKeyboard } from './../keyboards/set-lessons.keyboard.js';
import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js';
import { keyboard as backKeyboard } from './../keyboards/back.keyboard.js';

import { Lessons } from './../../db/models/Lessons.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/📔 Уроки|\/setlessons/i, async (ctx) => {
	ctx.reply('[📓] Выберите урок для которого хотите указать Д/3.', {
		reply_markup: setLessonsKeyboard,
	});
});

feature.callbackQuery(/setlessons-call/i, async (ctx) => {
	await ctx.editMessageText('[📓] Выберите урок для которого хотите указать Д/3.', {
		reply_markup: setLessonsKeyboard,
	});
});

const setLessonsConversation = async (conv, ctx) => {
	const lessonName = ctx.match[0].split('-')[1];

	await ctx.reply(
		`[⚒] Укажите Д/З для <b>${lessonName}</b>.`,
		{ reply_markup: backKeyboard }
	);
	
	const { msg } = await conv.waitFor('message:text');

	if (msg.text === '↪️ Назад') {
		return await ctx.reply(
			`[❌] Отмена указывания Д/З для <b>${lessonName}</b>.`, {
			reply_markup: menuKeyboard,
		});
	}

	await conv.external(async () => {
		let schedule = await Lessons.findOrCreate({ userId: ctx.from.id });

		schedule.lessons.set(lessonName.toLowerCase(), msg.text);

		schedule.save();
	});

	return await ctx.reply(
		`[🎓] Вы указали Д/З для <b>${lessonName}</b>: <code>${msg.text}</code>`, {
		reply_markup: menuKeyboard,
	});
};
feature.use(createConversation(setLessonsConversation));

feature.callbackQuery(/setlessons-.*/i, async (ctx) => {
	ctx.answerCallbackQuery();
	await ctx.conversation.enter('setLessonsConversation');
});