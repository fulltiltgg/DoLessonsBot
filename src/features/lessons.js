import { Composer } from "grammy";

import { createConversation } from "@grammyjs/conversations";

import { keyboard as backKeyboard } from './../keyboards/lessons.js'
import { lessons as lessonsKeyboard } from './../keyboards/welcome.js'

export const composer = new Composer();

async function lessons(conversation, ctx) {
	await ctx.reply(`[⚒] Укажите Д/З для <b>${ctx.match[0].toLowerCase()}</b>.`, { reply_markup: backKeyboard });
	
	const { msg } = await conversation.waitFor('message:text');

	conversation.log(msg)

	if (msg.text === '↪️ Назад') {
		await ctx.reply(`[❌] Отмена указывания Д/З для <b>${ctx.match[0].toLowerCase()}</b>.`, { reply_markup: lessonsKeyboard });
		return;
	}

	await ctx.reply('Дз для алгебры это' + msg.text)
};

const feature = composer.chatType('private');

feature.use(createConversation(lessons));

feature.hears(/Алгебра|Геометрия|ИнформатикаГеография|Биология|Химия|Литература|Нем\.|яз\.Рус\.|яз\.|Общество|История|'Физика'|'ОБЖ'/i, async ctx => {
	await ctx.conversation.enter('lessons');
});