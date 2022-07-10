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
function captionOptions(caption, entities) {
    if (!caption)
        return {};
    return {
        caption: caption,
        caption_entities: entities,
        parse_mode: entities && entities.length > 0 ? undefined : 'HTML'
    };
}
function sendPreview(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { sections: { enhance_post }, buttons } = ctx.state.translation;
        const { post, credentials } = ctx.session;
        const token = credentials.token;
        if (!post)
            return;
        const keyboard = new grammy_1.InlineKeyboard();
        let preview;
        switch (post.type) {
            case 'text':
                const options = post.entities && post.entities.length > 0 ? {
                    entities: post.entities,
                    parse_mode: undefined
                } : {};
                preview = yield ctx.reply(post.content, Object.assign(Object.assign({}, options), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token), disable_web_page_preview: post.disable_preview }));
                const entity = (_a = preview.entities) === null || _a === void 0 ? void 0 : _a.find(entity => entity.type === 'url');
                if (entity)
                    keyboard.text(buttons.enable_preview, 'toggle_preview').row();
                else
                    post.disable_preview = undefined;
                break;
            case 'animation':
                preview = yield ctx.replyWithAnimation(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
            case 'audio':
                preview = yield ctx.replyWithAudio(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
            case 'document':
                preview = yield ctx.replyWithDocument(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
            case 'photo':
                preview = yield ctx.replyWithPhoto(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
            case 'video':
                preview = yield ctx.replyWithVideo(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
            case 'voice':
                preview = yield ctx.replyWithVoice(post.content, Object.assign(Object.assign({}, captionOptions(post.caption, post.entities)), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) }));
                if (preview.caption)
                    keyboard.text(buttons.remove_caption, 'remove_caption').row();
                break;
        }
        keyboard.text(buttons.go_back, 'create_post').text(buttons.confirm_post, 'confirm_post').row();
        post.preview_id = preview.message_id.toString();
        const settings = yield ctx.reply(enhance_post.content, {
            reply_markup: keyboard
        });
        post.settings_id = settings.message_id.toString();
        ctx.session.step = 'enhance_post';
    });
}
exports.default = sendPreview;
//# sourceMappingURL=send-preview.js.map