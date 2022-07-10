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
const translation_1 = __importDefault(require("../translation"));
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const misc_1 = require("../utils/misc");
function generateAnswerFromPost(post, title) {
    const keyboard = (0, misc_1.generateInlineKeyboard)(post.buttons, post.unique_id);
    switch (post.type) {
        case 'text':
            return {
                type: 'article',
                id: post._id,
                title: title,
                reply_markup: keyboard,
                input_message_content: {
                    message_text: post.content,
                    entities: post.entities,
                    parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
                    disable_web_page_preview: post.disable_preview
                }
            };
        case 'animation':
            return {
                type: 'mpeg4_gif',
                id: post._id,
                title: title,
                mpeg4_file_id: post.content,
                reply_markup: keyboard,
                caption: post.caption,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
        case 'audio':
            return {
                type: 'audio',
                id: post._id,
                title: title,
                audio_file_id: post.content,
                reply_markup: keyboard,
                caption: post.caption,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
        case 'document':
            return {
                type: 'document',
                id: post._id,
                title: title,
                document_file_id: post.content,
                reply_markup: keyboard,
                caption: post.caption,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
        case 'photo':
            return {
                type: 'photo',
                id: post._id,
                title: title,
                photo_file_id: post.content,
                reply_markup: keyboard,
                caption: post.caption,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
        case 'video':
            return {
                type: 'video',
                id: post._id,
                title: title,
                video_file_id: post.content,
                caption: post.caption,
                reply_markup: keyboard,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
        case 'voice':
            return {
                type: 'voice',
                id: post._id,
                title: title,
                voice_file_id: post.content,
                caption: post.caption,
                reply_markup: keyboard,
                caption_entities: post.entities,
                parse_mode: post.entities && post.entities.length > 0 ? undefined : 'HTML',
            };
    }
    throw new Error('Unsupported post type. Contact admin of the bot');
}
function handleInlineQuery(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { query, from: { id, language_code } } = ctx.inlineQuery;
        const { inline } = translation_1.default[language_code] || translation_1.default.en;
        if (query.length > 0) {
            const post = yield Post_1.PostModel.findOne({ unique_id: query });
            if (post) {
                yield ctx.answerInlineQuery([generateAnswerFromPost(post, inline.result_title)], {
                    cache_time: 0,
                    is_personal: true
                });
            }
            else {
                yield ctx.answerInlineQuery([], {
                    cache_time: 0,
                    is_personal: true,
                    switch_pm_text: inline.create_post,
                    switch_pm_parameter: 'create_post'
                });
            }
        }
        else {
            const author = yield User_1.UserModel.findOne({ telegram_id: id });
            const posts = author ? yield Post_1.PostModel.find({ author: author }) : [];
            const results = posts.map(post => generateAnswerFromPost(post, inline.result_title));
            yield ctx.answerInlineQuery(results, {
                cache_time: 0,
                is_personal: true,
                switch_pm_text: inline.create_post,
                switch_pm_parameter: 'create_post'
            });
        }
    });
}
function setup(bot) {
    return __awaiter(this, void 0, void 0, function* () {
        bot.on('inline_query', handleInlineQuery);
    });
}
exports.default = { setup };
//# sourceMappingURL=handle-inline.js.map