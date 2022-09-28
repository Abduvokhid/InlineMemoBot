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
function togglePreview(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { post, credentials } = ctx.session;
        const token = credentials.token;
        const { buttons } = ctx.state.translation;
        if (post && post.type === 'text' && typeof post.disable_preview === 'boolean') {
            const disable_preview = !post.disable_preview;
            const options = post.entities && post.entities.length > 0 ? {
                entities: post.entities,
                parse_mode: undefined
            } : {};
            yield ctx.api.editMessageText(ctx.chat.id, parseInt(post.preview_id), post.content, Object.assign(Object.assign({}, options), { disable_web_page_preview: disable_preview, reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
            const keyboard = new grammy_1.InlineKeyboard()
                .text(disable_preview ? buttons.enable_preview : buttons.disable_preview, 'toggle_preview').row()
                .text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row();
            yield ctx.api.editMessageReplyMarkup(ctx.chat.id, ctx.callbackQuery.message.message_id, { reply_markup: keyboard });
            post.disable_preview = disable_preview;
            yield ctx.answerCallbackQuery();
        }
    });
}
exports.default = togglePreview;
//# sourceMappingURL=toggle-preview.js.map