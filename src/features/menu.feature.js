import { Composer } from "grammy";

import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/🎮 Меню|\/menu|\/start/, async ctx => {
	await ctx.reply('[🎨] Выберите команду из меню.', { reply_markup: menuKeyboard })
});