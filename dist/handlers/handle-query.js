"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sponsors_1 = __importDefault(require("../library/commands/sponsors"));
const commands_1 = require("../library/commands");
const create_post_1 = __importDefault(require("../library/states/create-post"));
const toggle_preview_1 = __importDefault(require("../library/states/toggle-preview"));
const remove_caption_1 = __importDefault(require("../library/states/remove-caption"));
const confirm_post_1 = __importDefault(require("../library/states/confirm-post"));
const misc_1 = require("../utils/misc");
function handleQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = ctx.callbackQuery;
        if (!data)
            return;
        const parts = data.split(':');
        switch (parts[0]) {
            case 'remove_button':
                const { post } = ctx.session;
                if (!post)
                    return;
                const { buttons } = post;
                if (!buttons)
                    return;
                const indexes = parts[1].split('-');
                if (indexes.length !== 2)
                    return;
                if (buttons[parseInt(indexes[0])]) {
                    if (buttons[parseInt(indexes[0])][parseInt(indexes[1])]) {
                        buttons[parseInt(indexes[0])].splice(parseInt(indexes[1]), 1);
                        if (buttons[parseInt(indexes[0])].length === 0)
                            buttons.splice(parseInt(indexes[0]), 1);
                    }
                }
                yield ctx.editMessageReplyMarkup({ reply_markup: (0, misc_1.generateKeyboard)(buttons, ctx.session.credentials.token) });
                break;
            case 'r':
                parts.splice(0, 1);
                const text = parts.join(':');
                yield ctx.answerCallbackQuery({ text: text, show_alert: true });
                break;
        }
        yield ctx.answerCallbackQuery();
    });
}
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        bot.callbackQuery('home', commands_1.start);
        bot.callbackQuery('create_post', create_post_1.default);
        bot.callbackQuery('sponsors', sponsors_1.default);
        bot.callbackQuery('about_us', commands_1.about);
        bot.callbackQuery('toggle_preview', toggle_preview_1.default);
        bot.callbackQuery('remove_caption', remove_caption_1.default);
        bot.callbackQuery('confirm_post', confirm_post_1.default);
        bot.on('callback_query', handleQuery);
    });
}
exports.default = { setup };
//# sourceMappingURL=handle-query.js.map