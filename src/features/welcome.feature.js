import { Composer } from "grammy";

import { keyboard as daysKeyboard } from './../keyboards/days.keyboard.js'
import { keyboard as lessonsKeyboard } from './../keyboards/lessons.keyboard.js'
import { keyboard as welcomeKeyboard } from './../keyboards/welcome.keyboard.js'

import { Users } from './../helpers/db.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.use(welcomeKeyboard);

feature.command('start', async ctx => {
	await ctx.reply('[👋] Добро пожаловать в Do Lessons, что вы хотите указать?', {
		reply_markup: welcomeKeyboard
	})
});

feature.hears(/📁 Узнать/, async ctx => {
	const lessons = await (await Users.findOne({ where: { userId: ctx.from.id } })).getLessons();
	const text = lessons.map(el => `${el.lessonId[0].toUpperCase()+el.lessonId.slice(1)}: ${el.value}`).join('\n');
	await ctx.reply(`[🧩] Вот ваше Д/З на завтра:\n<code>${text}</code>`);
});
feature.hears(/📔 Уроки/, async ctx => ctx.reply('[📓] Выберите урок!', { reply_markup: lessonsKeyboard }));
feature.hears(/📝 Расписание/, async ctx => ctx.reply('[⏳] Выберите день недели!', { reply_markup: daysKeyboard }));