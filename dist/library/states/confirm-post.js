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
const Post_1 = require("../../models/Post");
const converters_1 = require("../../utils/converters");
const generators_1 = require("../../utils/generators");
const commands_1 = require("../commands");
function confirmPost(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sections: { confirm_post } } = ctx.state.translation;
        const { post } = ctx.session;
        if (!post)
            return;
        const unique_id = (0, converters_1.convertBase)(Date.now() + (0, generators_1.generateNumber)(3).toString());
        const postDocument = new Post_1.PostModel({
            unique_id: unique_id,
            author: ctx.state.user._id,
            type: post.type,
            content: post.content,
            disable_preview: post.disable_preview,
            caption: post.caption,
            entities: post.entities,
            buttons: post.buttons,
        });
        yield postDocument.save();
        const message = `<code>@InlineMemoBot ${unique_id}</code>`;
        yield ctx.editMessageText(message);
        yield ctx.api.deleteMessage(ctx.chat.id, parseInt(ctx.session.post.preview_id));
        ctx.session.post = undefined;
        yield (0, commands_1.startCustom)(ctx, confirm_post.content);
    });
}
exports.default = confirmPost;
//# sourceMappingURL=confirm-post.js.map