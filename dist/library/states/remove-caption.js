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
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const misc_1 = require("../../utils/misc");
function removeCaption(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { post, credentials } = ctx.session;
        const token = credentials.token;
        const { buttons } = ctx.state.translation;
        if (post && post.type !== 'text') {
            ctx.session.post.caption = undefined;
            ctx.session.post.entities = undefined;
            yield ctx.api.editMessageCaption(ctx.from.id, parseInt(post.preview_id), { caption: '', reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) });
            const keyboard = new grammy_1.InlineKeyboard()
                .text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row();
            yield ctx.api.editMessageReplyMarkup(ctx.chat.id, ctx.callbackQuery.message.message_id, {
                reply_markup: keyboard
            });
            yield ctx.answerCallbackQuery();
        }
    });
}
exports.default = removeCaption;
//# sourceMappingURL=remove-caption.js.map