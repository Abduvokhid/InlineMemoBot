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
const Session_1 = require("../models/Session");
const bot_1 = __importDefault(require("../bot"));
const misc_1 = require("../utils/misc");
const INVALID_REQUEST = { error: 'Invalid request' };
const INVALID_URL = { error: 'Invalid url' };
const INVALID_USER_SESSION = { error: 'Invalid session' };
const INVALID_TOKEN = { error: 'Invalid token' };
const INVALID_POST = { error: 'Invalid post' };
function addButton(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { button_data, token, user } = req.body;
        if (!button_data || !token || !user)
            return res.status(404).json(INVALID_REQUEST);
        if (button_data.button.type === 'link' && !(0, misc_1.isValidUrl)(button_data.button.link))
            return res.status(404).json(INVALID_URL);
        const session_document = yield Session_1.SessionModel.findOne({ key: user.id });
        if (!session_document)
            return res.status(404).json(INVALID_USER_SESSION);
        const credentials = session_document.value.credentials;
        if (!credentials || token !== credentials.token)
            return res.status(404).json(INVALID_TOKEN);
        if (!session_document.value.post)
            return res.status(404).json(INVALID_POST);
        const post = session_document.value.post;
        if (button_data.row && post.buttons[button_data.row]) {
            post.buttons[button_data.row].push(button_data.button);
        }
        else {
            post.buttons.push([button_data.button]);
        }
        yield Session_1.SessionModel.updateOne({ key: user.id }, { value: session_document.value });
        yield bot_1.default.api.editMessageReplyMarkup(session_document.key, parseInt(post.preview_id), { reply_markup: (0, misc_1.generateKeyboard)(post.buttons, token) });
        return res.status(200).json(session_document.value.post);
    });
}
exports.default = addButton;
//# sourceMappingURL=add-button.js.map