import { Menu } from "@grammyjs/menu";

import { keyboard as lessonsKeyboard } from './lessons.keyboard.js'
import { keyboard as daysKeyboard } from './days.keyboard.js'

export const keyboard = new Menu('welcome');

keyboard
	.text('📔 Уроки', ctx => ctx.reply('[📓] Выберите урок!', { reply_markup: lessonsKeyboard }))
	.text('📝 Расписание', ctx => ctx.reply('[⏳] Выберите день недели!', { reply_markup: daysKeyboard }));
