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
const commands_1 = require("../library/commands");
const send_preview_1 = __importDefault(require("../library/states/send-preview"));
function postStep(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buttons } = ctx.state.translation;
        const { poll, dice, game, invoice, media_group_id, contact, sticker, video_note, venue, location, text, animation, audio, document, photo, video, voice, caption, entities, caption_entities } = ctx.message;
        if (poll || dice || game || invoice || media_group_id || contact || sticker || video_note || venue || location)
            return yield ctx.deleteMessage();
        let post = { buttons: [], type: 'text', content: '' };
        if (text) {
            if (text === buttons.go_back)
                return yield (0, commands_1.start)(ctx);
            post = { buttons: [], type: 'text', content: text, entities: entities, disable_preview: true };
        }
        else if (animation) {
            post = { buttons: [], type: 'animation', content: animation.file_id, caption: caption, entities: caption_entities };
        }
        else if (audio) {
            post = { buttons: [], type: 'audio', content: audio.file_id, caption: caption, entities: caption_entities };
        }
        else if (document) {
            post = { buttons: [], type: 'document', content: document.file_id, caption: caption, entities: caption_entities };
        }
        else if (photo) {
            post = { buttons: [], type: 'photo', content: photo[photo.length - 1].file_id, caption: caption, entities: caption_entities };
        }
        else if (video) {
            post = { buttons: [], type: 'video', content: video.file_id, caption: caption, entities: caption_entities };
        }
        else if (voice) {
            post = { buttons: [], type: 'voice', content: voice.file_id, caption: caption, entities: caption_entities };
        }
        ctx.session.post = post;
        yield (0, send_preview_1.default)(ctx);
        if (ctx.session.current_id) {
            yield ctx.api.editMessageReplyMarkup(ctx.chat.id, parseInt(ctx.session.current_id));
            ctx.session.current_id = undefined;
        }
    });
}
exports.default = postStep;
//# sourceMappingURL=post-step.js.map