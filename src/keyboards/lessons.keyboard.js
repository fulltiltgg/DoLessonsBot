import { Keyboard } from 'grammy'

export const keyboard = new Keyboard();

keyboard
	.text('Алгебра').text('Геометрия').text('Информатика').row()
	.text('География').text('Биология').text('Химия').row()
	.text('Литература').text('Нем. яз.').text('Рус. яз.').row()
	.text('Общество').text('История').text('Физика').row()
	.text('📁 Узнать').text('ОБЖ').text('📝 Расписание').row()
	.resized();