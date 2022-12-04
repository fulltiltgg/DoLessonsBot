import { Menu } from "@grammyjs/menu";
import { Keyboard } from 'grammy'

export const lessons = new Keyboard();

lessons
	.text('Алгебра').text('Геометрия').text('Информатика').row()
	.text('География').text('Биология').text('Химия').row()
	.text('Литература').text('Нем. яз.').text('Рус. яз.').row()
	.text('Общество').text('История').text('Физика').row()
	.text(' ').text('ОБЖ').text(' ').row()
	.resized();

export const days = new Keyboard();

days
	.text('Понедельник').text('Вторник').text('Среда').row()
	.text('Четверг').text('Пятница').row()
	.resized();

export const keyboard = new Menu('welcome');

keyboard
	.text('Уроки', ctx => ctx.reply('[📓] Выберите урок!', { reply_markup: lessons }))
	.text('Расписание', ctx => ctx.reply('[⏳] Выберите день недели!', { reply_markup: days }));
