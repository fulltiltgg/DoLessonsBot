import { Composer } from "grammy";

import { keyboard as daysKeyboard } from './../keyboards/days.keyboard.js'
import { keyboard as lessonsKeyboard } from './../keyboards/lessons.keyboard.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/📔 Уроки|\/setlessons/, async ctx => ctx.reply('[📓] Выберите урок!', { reply_markup: lessonsKeyboard }));

feature.hears(/📝 Расписание|\/setschedule/, async ctx => ctx.reply('[⏳] Выберите день недели!', { reply_markup: daysKeyboard }));