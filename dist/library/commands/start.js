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
exports.startCustom = void 0;
const grammy_1 = require("grammy");
function start(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.callbackQuery)
            yield ctx.deleteMessage();
        yield startCustom(ctx);
    });
}
function startCustom(ctx, text = undefined) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { menu, sections: { main } } = ctx.state.translation;
        const inline_keyboard = new grammy_1.InlineKeyboard()
            .text(menu.create_post, 'create_post').row()
            .text(menu.sponsors, 'sponsors').text(menu.about_us, 'about_us').row();
        const message = yield ctx.reply(text !== null && text !== void 0 ? text : main.content, {
            reply_markup: inline_keyboard
        });
        try {
            if ((_a = ctx.session.post) === null || _a === void 0 ? void 0 : _a.settings_id)
                yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.settings_id));
            if ((_b = ctx.session.post) === null || _b === void 0 ? void 0 : _b.preview_id)
                yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.preview_id));
            if (ctx.session.current_id)
                yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.current_id));
        }
        catch (e) {
            console.error(e, e.stack);
        }
        ctx.session.step = 'home';
        ctx.session.post = undefined;
        ctx.session.current_id = message.message_id.toString();
    });
}
exports.startCustom = startCustom;
exports.default = start;
//# sourceMappingURL=start.js.map