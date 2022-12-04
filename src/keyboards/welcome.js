import { Menu } from "@grammyjs/menu";
import { Keyboard } from 'grammy'

export const lessons = new Keyboard();

lessons
	.text('Алгебра').text('Геометрия').text('Информатика').row()
	.text('География').text('Биология').text('Химия').row()
	.text('Литература').text('Нем. яз.').text('Рус. яз.').row()
	.text('Общество').text('История').text('Физика').row()
	.text('📁 Узнать').text('ОБЖ').text('📝 Расписание').row()
	.resized();

export const days = new Keyboard();

days
	.text('Понедельник').text('Вторник').text('Среда').row()
	.text('Четверг').text('Пятница').row()
	.text('📁 Узнать').text('📔 Уроки').row()
	.resized();

export const keyboard = new Menu('welcome');

keyboard
	.text('📔 Уроки', ctx => ctx.reply('[📓] Выберите урок!', { reply_markup: lessons }))
	.text('📝 Расписание', ctx => ctx.reply('[⏳] Выберите день недели!', { reply_markup: days }));
