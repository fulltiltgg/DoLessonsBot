import { Keyboard } from 'grammy'

export const keyboard = new Keyboard();

keyboard
	.text('Понедельник').text('Вторник').text('Среда').row()
	.text('Четверг').text('Пятница').row()
	.text('📁 Д/З').text('🎮 Меню').row()
	.resized();