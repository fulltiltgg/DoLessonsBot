import { Composer } from 'grammy'

import { Users } from './../helpers/db.js'

export const composer = new Composer();

const feature = composer.chatType('private');

function tableSchedule(schedules) {
	const delta = 18; // 
	let text = '<code>';

	for (let schedule of schedules) {
		text += '┌' + '─'.repeat(delta-2) + '┐' + '\n';
		text += '|' + schedule.dayId + ' '.repeat(delta-schedule.dayId.length-2) + '|' + '\n';
		text += '├' + '─'.repeat(delta-2) + '┤' + '\n';

		for (let lesson of schedule.value.split(';')) {
			text += '│' + lesson + ' '.repeat(delta-lesson.length-2) + '|' + '\n';
		}

		text += '└' + '─'.repeat(delta-2) + '┘' + '\n';
	}

	return text+'</code>';
}

feature.command('schedule', async ctx => {
	const schedules = await (await Users.findOne({ where: { userId: ctx.from.id } })).getSchedules();

	ctx.reply(tableSchedule(schedules));
});