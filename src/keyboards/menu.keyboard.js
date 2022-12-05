import { Keyboard } from 'grammy'

export const keyboard = new Keyboard();

keyboard
	.text('📔 Уроки').text('📝 Расписание').row()
	.text('📁 Д/З').text('📚 Всё расписание').row()
	.resized();