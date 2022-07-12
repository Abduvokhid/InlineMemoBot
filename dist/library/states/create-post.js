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
function createPost(ctx) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { buttons, sections: { create_post } } = ctx.state.translation;
        const inline_keyboard = new grammy_1.InlineKeyboard()
            .text(buttons.go_back, 'home').row();
        yield ctx.editMessageText(create_post.content, {
            reply_markup: inline_keyboard
        });
        if ((_a = ctx.session.post) === null || _a === void 0 ? void 0 : _a.preview_id)
            yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.preview_id));
        ctx.session.step = 'create_post';
        ctx.session.post = undefined;
        ctx.session.current_id = (_c = (_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.message_id.toString();
        yield ctx.answerCallbackQuery();
    });
}
exports.default = createPost;
//# sourceMappingURL=create-post.js.map