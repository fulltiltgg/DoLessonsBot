import { Composer } from 'grammy';

import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js';

import { Lessons } from './../../models/Lessons.js';
import { Schedules } from './../../models/Schedules.js';

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/🎮 Меню|\/menu|\/start/, async ctx => {
	await ctx.reply('[🎨] Выберите команду из меню.', { reply_markup: menuKeyboard });
});

function normalizeDay(dayId) {
	const days = { 0: 'воскресенье', 1: 'понедельник', 2: 'вторник', 3: 'среда', 4: 'четверг', 5: 'пятница', 6: 'суббота'};

	return days[dayId];
};

function tableSchedule(schedules) {
	const delta = 18; // 
	let text = '<code>';

	for (let schedule of schedules) {
		text += '┌' + '─'.repeat(delta-2) + '┐' + '\n';
		text += '|' + normalizeDay(schedule.dayId) + ' '.repeat(delta-normalizeDay(schedule.dayId).length-2) + '|' + '\n';
		text += '├' + '─'.repeat(delta-2) + '┤' + '\n';

		for (let lesson of schedule.lessons) {
			text += '│' + lesson + ' '.repeat(delta-lesson.length-2) + '|' + '\n';
		}

		text += '└' + '─'.repeat(delta-2) + '┘' + '\n';
	}

	return text+'</code>';
}

feature.hears(/📚 Всё расписание|\/getschedule/, async ctx => {
	const schedules = await Schedules.find({ userId: ctx.from.id });

	ctx.reply(tableSchedule(schedules));
});

feature.hears(/📁 Д\/З|\/getlessons/, async ctx => {
	const tomorrowDay = new Date().getDay()+1;
	const dayId = (tomorrowDay !== 0) && (tomorrowDay !== 6) ? tomorrowDay : 1;

	let schedule = await Schedules.find({ userId: ctx.from.id, dayId: tomorrowDay });

	if (!schedule[0]) {
		schedule = new Schedules({ userId: ctx.from.id, dayId: tomorrowDay, lessons: [] });
	} else {
		schedule = schedule[0];
	}

	let lessons = await Lessons.find({ userId: ctx.from.id });

	if (!lessons[0]) {
		lessons = new Lessons({ userId: ctx.from.id, lessons: new Map() });
	} else {
		lessons = lessons[0];
	}

	const tomorrowLessons = schedule.lessons.map(el => {
		const lesson = lessons.lessons.get(el);
	
		return `${el[0].toUpperCase()+el.slice(1)}: ${lesson}`;
	}).join('\n');

	await ctx.reply(`[🧩] Вот ваше Д/З на завтра:\n<code>${tomorrowLessons}</code>`);
});